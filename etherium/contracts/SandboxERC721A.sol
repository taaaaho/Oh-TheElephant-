// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract SandboxERC721A is ERC721A {
    address public owner;
    uint256 collectionSize;
    uint256 publicSaleStartTime;
    uint256 maxPerAddressDuringMint;

    mapping(address => uint256) public whitelist;

    constructor (uint64 publicPrice_, uint256 collectionSize_) ERC721A ("Sandbox1", "ABEKO") {
        owner = msg.sender;
        publicPrice = publicPrice_;
        collectionSize = collectionSize_;
        publicSaleStartTime = 1653215401;
        maxPerAddressDuringMint = 3;
    }

    // Modifier
    modifier onlyOwner() {
        require(owner == msg.sender, 'not a owner');
        _;
    }
    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    // Events
    event Minted(
        address indexed _from, uint256 _tokenId
    );

    // Price 
    uint64 public publicPrice;
    function setPublicPrice(uint64 publicPrice_) external onlyOwner {
        publicPrice = publicPrice_;
    }

    // Phase
    bool isWhitelistPhase = true;
    function setPhase(bool isWhitelistPhase_) external onlyOwner {
        isWhitelistPhase = isWhitelistPhase_;
    }

    // Metadata URI
    string private _baseTokenURI;

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    // Whitelist
    function seedWhitelist(address[] memory addresses, uint256[] memory numSlots)
    external
    onlyOwner
    {
        require(
            addresses.length == numSlots.length,
            "addresses does not match numSlots length"
        );
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = numSlots[i];
        }
    }

    // Mint
    function mint(uint256 quantity) public callerIsUser onlyOwner {
        require(publicPrice != 0, "Public sale has not begun yet");
        require(
            publicSaleStartTime != 0 && block.timestamp >= publicSaleStartTime,
                "sale has not started yet"
            );
        require(totalSupply() + quantity < collectionSize, "Sold out");
        require(
            numberMinted(msg.sender) + quantity <= maxPerAddressDuringMint,
            "can not mint this many"
        );

        if (isWhitelistPhase) {
            require(whitelist[msg.sender] > 0, "not eligible for whitelist mint");
            whitelist[msg.sender]--;
        }
        _safeMint(msg.sender, quantity);

        emit Minted(msg.sender, quantity);
    }

    function numberMinted(address sender) public view returns (uint256) {
        return _numberMinted(sender);
    }
}
