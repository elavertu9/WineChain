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

    it("should be able to get token balance of an owner", async () => {
        await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        let result = await contractInstance.balanceOf(alice);
        expect(result.words[0]).to.equal(2);
    });

    it("should be able to get tokens from owner by index", async () => {
        await contractInstance.addWineToChain(
            alice, "Chelan Vineyards", "Rose", "United States", 2012,
            {from: alice}
        );
        await contractInstance.addWineToChain(
            alice, "Domaine en Vallee", "Grenache", "France", 2015,
            {from: alice}
        );
        let result = await contractInstance.balanceOf(alice);
        let count = result.words[0];
        let producers = ["Chelan Vineyards", "Domaine en Vallee"]
        for (let i = 0; i < count; i++) {
            result = await contractInstance.tokenOfOwnerByIndex(alice, i);
            let bottle = await contractInstance.getWineData(result.words[0]);
            expect(bottle.producer).to.equal(producers[i]);
        }
    });
});