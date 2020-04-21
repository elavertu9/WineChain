
const WineChain = artifacts.require("./WineChain.sol");

module.exports = function(deployer, _network, _accounts) {
  deployer.deploy(WineChain);
};