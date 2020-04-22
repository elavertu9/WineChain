const path = require("path");
const fs = require("fs")
const HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic;
if (fs.existsSync(".secret")) {
    mnemonic = fs.readFileSync(".secret").toString().trim();
} else {
    // Don't be an asshole and steal my test account
    mnemonic = "thing neither cheese expire curve auction glow front stay tag inject carry";
}

var infuraKey;
if (fs.existsSync(".infura")) {
    infuraKey = "https://rinkeby.infura.io/v3/" + fs.readFileSync(".infura").toString().trim();;
} else {
    infuraKey = "https://rinkeby.infura.io/v3/2ed2b7fb78904757a5fb03d3878efa10";
}

module.exports = {
  // See http://truffleframework.com/docs/advanced/configuration
  // to customize your Truffle configuration!
  // contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraKey),
      network_id: 4
    }
  }
};