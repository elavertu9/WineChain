const WineChain = require("../build/contracts/WineChain.json");
// const fs = require('fs');
const mnemonic = "review confirm village turkey where stadium pair mirror leaf zoo recipe supreme"
// const mnemonic = fs.readFileSync(".secret").toString().trim();
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const wallet = new HDWalletProvider(mnemonic, 'http://localhost:7545', 0)
const web3 = new Web3(wallet);
const wineContract = new web3.eth.Contract(WineChain.abi, "0x75e71D99A1cDA36c491B588de9d5C5bCb599a705");

console.log(wallet.addresses)

// try {
//     wineContract.methods.addWineToChain(0, "Chelan Vineyards", "Rose", "United States", 2012)
//         .send({from: wallet.addresses[0]})
//         .on("receipt", (receipt) => {
//             console.log(receipt)
//         })
// } catch (err) {
//     console.log(err)
// }
// wineContract.methods.balanceOf(wallet.addresses[0]).call({from: wallet.addresses[0]}, (err, result) => {
//     let tokenBal = result
//     console.log(result)
//     for (let i = 0; i < tokenBal; i++) {
//         wineContract.methods.tokenOfOwnerByIndex(wallet.addresses[0], i).call({from: wallet.addresses[0]}, 
//         (err, result) => {
//             console.log(result)
//         })
//     }
// });

// wineContract.methods.tokenOfOwnerByIndex(wallet.addresses[0], 1).call({from: wallet.addresses[0]}, 
//     (err, result) => {
//         console.log(result)
//         console.log(err)
//     });

// wineContract.methods.tokenByIndex(0).call({from: wallet.addresses[0]}, 
//     (e, r) => {
//         console.log(e,r);
//     }
// );

console.log("done");