require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat");

/**
 *
 * @param {string} contractName
 * @param {unknown[]} constructorArgs
 * @returns {Promise<Contract>} deployed contract facrtory
 */
exports.delpoyContract = async function (contractName, constructorArgs) {
  const Contract = await ethers.getContractFactory(contractName);

  const contract = await Contract.deploy(...constructorArgs);
  await contract.deployed();

  return contract;
};
