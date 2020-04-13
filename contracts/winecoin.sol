pragma solidity >=0.5.0 <0.6.0;

import "./winefactory.sol";
import "./erc721.sol";

contract WineCoin is WineFactory, ERC721 {

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerWineCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return wineBottleToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerWineCount[_to] = ownerWineCount[_to].add(1);
        ownerWineCount[msg.sender] = ownerWineCount[msg.sender].sub(1);
        wineBottleToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

   function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (wineBottleToOwner[_tokenId] == msg.sender, 'only owner can transfer');
        _transfer(_from, _to, _tokenId);
    }
}