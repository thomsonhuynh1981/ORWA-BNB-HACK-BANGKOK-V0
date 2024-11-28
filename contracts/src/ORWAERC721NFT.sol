// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "./ERC721.sol";
import "./ERC721URIStorage.sol";
import "./ERC721Pausable.sol";
import "./Counters.sol";
import "./Ownable.sol";

contract OLYM3RealWorldAssets is ERC721, ERC721URIStorage, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;

using Counters for Counters.Counter;

    struct NftItem {
        uint tokenId;
        address creator;
        bool isStaking;
        bool isCertified;
        bool isRefused; // Attribute to track refused status
    }

    Counters.Counter private _tokenIds;
    Counters.Counter private _stakedItems;

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint => NftItem) private _idToNftItem;
    mapping(uint => address) private _stakedNfts;

    event NftItemCreated(uint tokenId, address creator, bool isStaking);
    event Staked(uint tokenId, address owner);
    event CertificateGranted(uint tokenId);
    event CertificateRefused(uint tokenId);

    constructor(address initialOwner)
        ERC721("OLYM3 - Real-World Assets", "ORWAs")
        Ownable(initialOwner)
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

function mintToken(string memory _tokenURI) public returns (uint) {
        require(!tokenURIExists(_tokenURI), "Token URI already exists");

        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        _createNftItem(newTokenId);
        _usedTokenURIs[_tokenURI] = true;

        return newTokenId;
    }

    function stakeNFT(uint tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(_stakedNfts[tokenId] == address(0), "NFT is already staked");
        require(!_idToNftItem[tokenId].isStaking, "NFT is already in staking status");

        _stakedNfts[tokenId] = msg.sender;
        _stakedItems.increment();
        _idToNftItem[tokenId].isStaking = true;

        emit Staked(tokenId, msg.sender);
    }

    function getCertificate(uint tokenId) public onlyOwner {
        require(isNFTStaked(tokenId), "NFT is not staked for assessment");
        require(!_idToNftItem[tokenId].isCertified, "NFT already certified");
        require(!_idToNftItem[tokenId].isRefused, "NFT has been refused");

        _idToNftItem[tokenId].isCertified = true;
        _idToNftItem[tokenId].isRefused = false;

        emit CertificateGranted(tokenId);
    }

    function refuseToConfirm(uint tokenId) public onlyOwner {
        require(isNFTStaked(tokenId), "NFT is not staked for assessment");
        require(!_idToNftItem[tokenId].isCertified, "NFT already certified");

        _idToNftItem[tokenId].isRefused = true;

        emit CertificateRefused(tokenId);
    }

    function isNFTStaked(uint tokenId) public view returns (bool) {
        return _stakedNfts[tokenId] != address(0);
    }

    function tokenURIExists(string memory _tokenURI) public view returns (bool) {
        return _usedTokenURIs[_tokenURI];
    }

    function isRefused(uint tokenId) public view returns (bool) {
        return _idToNftItem[tokenId].isRefused;
    }

    function isCertified(uint tokenId) public view returns (bool) {
        return _idToNftItem[tokenId].isCertified;
    }

    function _createNftItem(uint tokenId) private {
        _idToNftItem[tokenId] = NftItem(
            tokenId,
            msg.sender,
            false,
            false,
            false
        );

        emit NftItemCreated(tokenId, msg.sender, false);
    }

    function totalSupply() public view returns (uint) {
        return _tokenIds.current();
    }

    function getOwnedNfts(address owner) public view returns (uint[] memory) {
        uint totalItems = _tokenIds.current();
        uint ownedItemCount = 0;

        for (uint i = 1; i <= totalItems; i++) {
            if (ownerOf(i) == owner) {
                ownedItemCount++;
            }
        }

        uint[] memory ownedNfts = new uint[](ownedItemCount);
        uint currentIndex = 0;

        for (uint i = 1; i <= totalItems; i++) {
            if (ownerOf(i) == owner) {
                ownedNfts[currentIndex] = i;
                currentIndex++;
            }
        }

        return ownedNfts;
    }

    // function createNewContract() public onlyOwner returns (address) {
    //     OLYM3RealWorldAssets newContract = new OLYM3RealWorldAssets();
    //     return address(newContract);
    // }

}
