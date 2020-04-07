pragma solidity >=0.5.0 <0.6.0;

import './ownable.sol';
import './safemath.sol';

contract WineFactory is Ownable {
    
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    
    mapping (uint256 => address) wineBottleToOwner;
    mapping (address => uint256) ownerWineCount;
    
    event NewBottle(uint wineId, string producer, string varietal, string country_of_origin, uint16 vintage);
    
    struct WineBottle {
        string producer; // Wine Vineyard / Maker
        string varietal; // Red blend, Pinot, or Grape Style (Riesling), etc.
        string country_of_origin;
        uint16 vintage; // Grape vintage
        bool consumed; // Whether the wine has been consumed...
        // uint256 uuid; // Unique wine identifying id --> does this need to be included?
    }
    
    WineBottle[] public wines;
    
    function _addWineToChain(string memory _producer, string memory _varietal, string memory _country, uint16 vintage) public {
        // Check if the adding party is a valid producer...?
        uint id = wines.push(WineBottle(_producer, _varietal, _country, vintage, false)) - 1;
        wineBottleToOwner[id] = msg.sender;
        ownerWineCount[msg.sender] = ownerWineCount[msg.sender].add(1);
        emit NewBottle(id, _producer, _varietal, _country, vintage);
    }
    
    
}