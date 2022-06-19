// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


contract Sandbox1 is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public owner;
    uint256 collectionSize; // token supply はburnで正確な数が取れなくなることがあるため定義
    mapping(address => uint256) public whitelist;

    // Reveal function
    bool public revealed = false;
    string public notRevealedUri = 'https://gateway.pinata.cloud/ipfs/QmTKhdVeutzpQp6kpM8cKYmJt1BL4UqLaGzFNaEXCRuE39';

    function setReveal(bool reveal_) public onlyOwner {
        revealed = reveal_;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        return super.tokenURI(tokenId);
    } 
    // Reveal function

    constructor (
        string memory _name,
        string memory _symbol,
        uint64 publicPrice_, 
        uint256 collectionSize_
    ) ERC721 (_name, _symbol) {
        owner = msg.sender;
        publicPrice = publicPrice_;
        collectionSize = collectionSize_;
        publicSaleStartTime = 1653215401;
        _baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/";
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

    // Sale start time
    uint256 publicSaleStartTime; // UNIX Timestamp  e.g. 1653215401
    function setPublicSaleStartTime(uint256 publicSaleStartTime_) external onlyOwner {
        publicSaleStartTime = publicSaleStartTime_;
    }

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
    function mint() public payable callerIsUser {
        require(publicPrice != 0, "Public sale has not begun yet");
        require(
            publicSaleStartTime != 0 && block.timestamp >= publicSaleStartTime,
                "sale has not started yet"
            );
        require(_tokenIds.current() < collectionSize, "Sold out");
        require(msg.value == publicPrice, "Mint cost is wrong");

        if (isWhitelistPhase) {
            require(whitelist[msg.sender] > 0, "not eligible for whitelist mint");
            whitelist[msg.sender]--;
        }
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _safeMint(msg.sender, newItemId);

        emit Minted(msg.sender, newItemId);
    }

    // Withdraw
    function withdraw() public virtual {
        // Sub account 0xaa04355323A3bEB161161c281A802575D163E668
        (bool dao, ) = payable(0xaa04355323A3bEB161161c281A802575D163E668).call{
            value: (address(this).balance * 30) / 100
        }("");
        require(dao);

        // Owner account 0x48064EF45b66F94d4Bd4eDEFE703B8E09D237406
        (bool team, ) = payable(0x48064EF45b66F94d4Bd4eDEFE703B8E09D237406)
            .call{value: address(this).balance}("");
        require(team);
    }
}
