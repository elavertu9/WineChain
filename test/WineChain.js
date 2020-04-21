const WineChain = artifacts.require("WineChain");
const expect = require('chai').expect;
const chai = require('chai');

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
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        expect(result.logs[0].args.to).to.equal(alice)
    });

    it("should be able to retrieve wine data", async () => {
        let result = await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        let tokenId = result.logs[0].args.tokenId.words[0];
        result = await contractInstance.getWineData(tokenId);
        expect(result.producer).to.equal("Chelan Vineyards");
        expect(result.varietal).to.equal("Rose");
        expect(result.country_of_origin).to.equal("United States");
        expect(result.vintage.words[0]).to.equal(2012);
    });

    it("should be able to determine the existance of a wine", async () => {
        let result = await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        let tokenId = result.logs[0].args.tokenId.words[0];
        // Token should exist
        result = await contractInstance.exists(tokenId);
        expect(result).to.equal(true);
        // Token shouldn't exist
        result = await contractInstance.exists(2);
        expect(result).to.equal(false);
    });

    it("should be able to check ownership", async () => {
        let result = await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        let tokenId = result.logs[0].args.tokenId.words[0];
        result = await contractInstance.ownerOf(tokenId);
        expect(result).to.equal(alice);
    });

    it("should be able to transfer ownership", async () => {
        let result = await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        let tokenId = result.logs[0].args.tokenId.words[0];
        await contractInstance.safeTransferFrom(alice, bob, tokenId);
        result = await contractInstance.ownerOf(tokenId);
        expect(result).to.equal(bob);
    });

    it("shouldn't allow non-owners to mint tokens", async () => {
        try {
            let result = await contractInstance.addWineToChain(
                bob, "Kermit Lynch", "Sav Blanc", "Franc", 2003,
                {from: bob}
            );
            chai.assert.fail();
        } catch (err) {
            chai.assert.isOk(err, "Expecting an error");
        }

    });
});