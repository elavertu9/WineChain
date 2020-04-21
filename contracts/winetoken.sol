pragma solidity >=0.5.0 <0.6.0;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import '../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract WineToken is ERC721, Ownable{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public constant name = "WineChain Token";
    string public constant symbol = "WCT";

    Counters.Counter public totalSupply;

    struct WineBottle {
        string producer; // Wine Vineyard / Maker
        string varietal; // Red blend, Pinot, or Grape Style (Riesling), etc.
        string country_of_origin;
        uint16 vintage; // Grape vintage
        bool consumed; // Whether the wine has been consumed...
    }

    mapping (uint256 => WineBottle) public wineData;

    function getWineData(uint256 _id) public view returns (string memory producer,
        string memory varietal, string memory country_of_origin, uint16 vintage, bool consumed)
    {
        require(_exists(_id), "You can't get data from a non-existant bottle");
        WineBottle memory _bottle = wineData[_id];
        // Set return data
        producer = _bottle.producer;
        varietal = _bottle.varietal;
        country_of_origin = _bottle.country_of_origin;
        vintage = _bottle.vintage;
        consumed = _bottle.consumed;
    }

    function exists(uint _id) public view returns (bool) {
        return _exists(_id);
    }

    function addWineToChain(address _purchaser_address, string memory _producer,
        string memory _varietal, string memory _country, uint16 _vintage) public onlyOwner
    {
        // Construct new bottle
        WineBottle memory newBottle = WineBottle({
            producer: _producer,
            varietal: _varietal,
            country_of_origin: _country,
            vintage: _vintage,
            consumed: false
        });
        // Get new id
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        // Adding bottle data to the contract
        wineData[currentId] = newBottle;
        // Mint a new wine token
        _mint(_purchaser_address, currentId);
    }

}