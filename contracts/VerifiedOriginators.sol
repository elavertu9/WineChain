pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";

contract VerifiedOriginators is Ownable{

    mapping (address => string) verifiedOriginators;

    function addVerifiedOriginator(address _originator, string memory title) public onlyOwner {
        require(_originator != address(0), "Invalid producer address");
        require(bytes(verifiedOriginators[_originator]).length == 0, "Producer already exists");
        require(bytes(title).length > 0, "Must have a non-empty title");
        verifiedOriginators[_originator] = title;
    }

    function isVerifiedOriginator(address _originator) public view returns (bool) {
        if (bytes(verifiedOriginators[_originator]).length == 0) {
            return false;
        } else {
            return true;
        }
    }

    function getOriginatorTitle(address _originator) public view returns (string memory) {
        if (bytes(verifiedOriginators[_originator]).length == 0) {
            return "";
        } else {
            return verifiedOriginators[_originator];
        }
    }
}