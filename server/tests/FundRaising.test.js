import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("deploy", () => {
  it("deploy-test", async () => {
    const FundRaising = await ethers.getContractFactory("FundRaising");
    const fundRaising = await FundRaising.deploy();
    await fundRaising.deployed();
  });
});
