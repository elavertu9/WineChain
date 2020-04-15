var WineChain = artifacts.require("./WineChain.sol");

module.exports = function(deployer) {
  deployer.deploy(WineChain);
};
