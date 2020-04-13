const WineChain = artifacts.require("WineChain");
const expect = require('chai').expect;

contract("WineChain", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        // const provider = Ganache.provider();// use it like how you would normally use a provider
        // const web3 = new Web3(provider);
        // const accounts = await web3.eth.getAccounts();
        // const instance = new web3.eth.Contract(WineChain.abi);
        // const contractInstance = await instance.deploy({
        //     data: CryptoZombies.evm.bytecode.object
        // }).send({
        //     from: accounts[0],
        //     gas: 150000
        // });
        contractInstance = await WineChain.new();
    });

    it("should be able to mint a new wine bottle", async () => {
        // (string memory _producer, string memory _varietal, string memory _country, uint16 vintage)
        const result = await contractInstance.addWineToChain(
            "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        expect(result.logs[0].args.producer).to.equal("Chelan Vineyards");
    });
});