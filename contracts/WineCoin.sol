pragma solidity >=0.5.0 <0.6.0;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol';
import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Burnable.sol';
import './VerifiedOriginators.sol';

contract WineCoin is ERC721, ERC721Enumerable, ERC721Burnable, VerifiedOriginators {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public constant name = "WineChain Token";
    string public constant symbol = "WCT";

    struct WineBottle {
        string producer; // Wine Vineyard / Maker
        string varietal; // Red blend, Pinot, or Grape Style (Riesling), etc.
        string country_of_origin;
        uint16 vintage; // Grape vintage
        address bottle_originator; // the address of the bottle originator (who added it to the chain)
        bool verified_originator; // Whether the originator is verified
    }

    mapping (uint256 => WineBottle) public wineData;

    function getWineData(uint256 _id) public view returns
    (string memory producer, string memory varietal, string memory country_of_origin,
        uint16 vintage, address bottle_originator, bool verified_originator)
    {
        require(_exists(_id), "You can't get data from a non-existant bottle");
        WineBottle memory _bottle = wineData[_id];
        // Set return data
        producer = _bottle.producer;
        varietal = _bottle.varietal;
        country_of_origin = _bottle.country_of_origin;
        vintage = _bottle.vintage;
        bottle_originator = _bottle.bottle_originator;
        verified_originator = _bottle.verified_originator;
    }

    function exists(uint _id) public view returns (bool) {
        return _exists(_id);
    }

    function updateBottleVerification(uint256 _id) public returns (bool) {
        require(_exists(_id), "Bottle must exist");
        WineBottle storage _bottle = wineData[_id];
        address _originator = _bottle.bottle_originator;
        if (isVerifiedOriginator(_originator)) {
            _bottle.verified_originator = true;
            return true;
        } else {
            return false;
        }
    }

    // Use message sender instead of producer address
    function addWineToChain(string memory _producer, string memory _varietal,
    string memory _country, uint16 _vintage) public returns (uint256 tokenId)
    {
        // Check for a verified producer, they can only producer under their name
        bool isVerified = isVerifiedOriginator(msg.sender);
        // Construct new bottle
        WineBottle memory newBottle = WineBottle({
            producer: _producer,
            varietal: _varietal,
            country_of_origin: _country,
            vintage: _vintage,
            bottle_originator: msg.sender, // the address of the original producer (who added it to the chain)
            verified_originator: isVerified // Whether the producer is verified
        });
        // Get new id
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        // Adding bottle data to the contract
        wineData[currentId] = newBottle;
        // Mint a new wine token
        _mint(msg.sender, currentId);
        return currentId;
    }

}