require("@nomiclabs/hardhat-ethers");
const { expect } = require("chai");
const { getWeiFromEthers } = require("../scripts/ethersToWei");
const { BigNumber } = require("ethers");
const { delpoyContract } = require("../scripts/deploy");

describe("Fund Raising", () => {
  it("constructor", async () => {
    const deadlineDays = 10;
    const goal = getWeiFromEthers(10n);
    const minimumContribution = getWeiFromEthers(1n);
    const fundRaising = await delpoyContract("FundRaising", [
      deadlineDays,
      goal,
      minimumContribution,
    ]);

    expect(await fundRaising.getDetails()).to.eql([
      fundRaising.signer.address, // owner
      BigNumber.from("0"), // raisedAmount
      BigNumber.from("0"), // totalContributors
      BigNumber.from("0"), // balance
      [], // contributors
      [], // spending requests details
      [], // shared reports
    ]);
  });
});
