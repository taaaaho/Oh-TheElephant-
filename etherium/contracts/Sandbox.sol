// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract Sandbox1 is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;
    uint256 collectionSize;
    uint256 publicSaleStartTime;

    mapping(address => uint256) public whitelist;

    constructor (uint64 publicPrice_, uint256 collectionSize_) ERC721 ("Sandbox1", "ABEKO") {
        console.log('public price is %s', publicPrice_);
        console.log('msg, sender is %d', msg.sender);
        owner = msg.sender;
        publicPrice = publicPrice_;
        collectionSize = collectionSize_;
        publicSaleStartTime = 1653215401;
    }

    // Modifier
    modifier onlyOwner() {
        console.log('onlyOwner: owner is %d / msg.sender is %d', owner, msg.sender);
        require(owner == msg.sender, 'not a owner');
        _;
    }
    modifier callerIsUser() {
        console.log('tx.origin is %d', tx.origin);
        console.log('msg.sender is %d', tx.origin);
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
        console.log('block.timestamp: ', block.timestamp);
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
    // function _baseURI() internal view virtual override returns (string memory) {
    //     return "https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/";
    // }

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
    function mint() public callerIsUser onlyOwner {
        require(publicPrice != 0, "Public sale has not begun yet");
        require(
            publicSaleStartTime != 0 && block.timestamp >= publicSaleStartTime,
                "sale has not started yet"
            );
        require(_tokenIds.current() < 40, 'All NFT Minted');
        require(_tokenIds.current() < collectionSize, "Sold out");

        if (isWhitelistPhase) {
            require(whitelist[msg.sender] > 0, "not eligible for whitelist mint");
            whitelist[msg.sender]--;
        }
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(msg.sender, newItemId);

        emit Minted(msg.sender, newItemId);
        // return newItemId;
    }
}
