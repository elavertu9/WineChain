const WineChain = artifacts.require("WineChain");
const expect = require('chai').expect;
const chai = require('chai');

contract("VerifiedOriginators", (accounts) => {
    let [alice, bob, carol] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await WineChain.new();
    });

    it("should be able to add a verified originator", async () => {
        let result = await contractInstance.addVerifiedOriginator(alice, "WineChain Team Official", {from: alice});
        result = await contractInstance.isVerifiedOriginator(alice);
        expect(result).to.equal(true);
    });

    it("should be able to get the title of a verified originator", async () => {
        let result = await contractInstance.addVerifiedOriginator(alice, "WineChain Team Official", {from: alice});
        result = await contractInstance.getOriginatorTitle(alice);
        expect(result).to.equal("WineChain Team Official");
    });

    it("shouldn't allow non-owners to add originators", async () => {
        try {
            let result = await contractInstance.addVerifiedOriginator(bob, "WineChain Team Official", {from: bob});
            chai.assert.fail()
        } catch (err) {
            chai.assert.isOk(err, "error should be thrown");
        }
    });

    it("should verify originators for when adding wines", async () => {
        let result = await contractInstance.addVerifiedOriginator(bob, "Bob The Wine Guy", {from: alice});
        result = await contractInstance.addWineToChain(
            "Chelan Vineyards", "Rose", "United States", 2012,
            {from: bob}
        );
        let _id = result.logs[0].args.tokenId.words[0]
        result = await contractInstance.getWineData(_id);
        // check that the bottle is marked from bob and has his verifications
        expect(result.bottle_originator).to.equal(bob);
        expect(result.verified_originator).to.equal(true);
        let originator_title = await contractInstance.getOriginatorTitle(result.bottle_originator);
        expect(originator_title).to.equal("Bob The Wine Guy");
    });

    it("should preserve originator info on transfer", async () => {
        let result = await contractInstance.addVerifiedOriginator(bob, "Bob The Wine Guy", {from: alice});
        result = await contractInstance.addWineToChain(
            "Chelan Vineyards", "Rose", "United States", 2012,
            {from: bob}
        );

        let _id = result.logs[0].args.tokenId.words[0]
        await contractInstance.safeTransferFrom(bob, carol, _id, {from: bob});

        let bottleOwner = await contractInstance.ownerOf(_id);

        expect(bottleOwner).to.equal(carol);
        let wineData = await contractInstance.getWineData(_id);

        expect(wineData.bottle_originator).to.equal(bob);
        expect(wineData.verified_originator).to.equal(true);
    });

    it("should be able to distinguish between verified and non-verified bottles", async () => {
        await contractInstance.addVerifiedOriginator(bob, "Charles Neal Selections", {from: alice});
        let add1 = await contractInstance.addWineToChain(
            "Domaine en Vallee du Rhone", "Piaugier Sablet", "France", 2015,
            {from: bob}
        );
        let add2 = await contractInstance.addWineToChain(
            "Domaine en Vallee du Rhone", "Piaugier Sablet", "France", 2015,
            {from: carol}
        );

        let charlesNealBottle = add1.logs[0].args.tokenId;
        let carolsImposter = add2.logs[0].args.tokenId;

        let charlesNealWineData = await contractInstance.getWineData(charlesNealBottle);
        let carolsImposterWineData = await contractInstance.getWineData(carolsImposter);

        let isCharlesVerified = charlesNealWineData.verified_originator;
        let isCarolsVerified = carolsImposterWineData.verified_originator;

        expect(isCharlesVerified).to.equal(true);
        expect(isCarolsVerified).to.equal(false);
    });
});

