const WineChain = artifacts.require("./WineChain.sol");
const WineCoin = artifacts.require("./WineCoin.sol");

module.exports = async function(deployer, network, accounts) {

  await deployer.deploy(WineChain);
  const WCtoken = await WineChain.deployed();

  const _wallet = accounts[0];
  const _token = WCtoken.address;

  console.log("Wallet & Token", _wallet, _token);
  await deployer.deploy(WineCoin, _wallet, _token);
  return true;
};