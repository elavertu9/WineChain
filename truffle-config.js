const path = require("path");
const fs = require("fs")
const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraKey = "7907400a35c54e9da266b928dcaea45a";
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545,
      network_id: '*'
    }
  }
};
