// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor () ERC721 ("Oh! The Elephant!", "ABEKO") {}

    event Minted(
        address indexed _from, uint256 _tokenId
    );

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmWkBbaGiX56HFAraSsb6WyapJkQLSRMPhmEQaMeEBnnS6/";
    }

    function mint() public returns (uint256) {
        require(_tokenIds.current() < 40, 'All NFT Minted');
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        emit Minted(msg.sender, newItemId);
        return newItemId;
    }
}
