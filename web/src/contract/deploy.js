import { ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function deployContarct(...constructorArgs) {
  try {
    const metadata = FundRaisignFactory;
    const web3Provider = window.ethereum;
    console.log(web3Provider);
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

    let factory = new ethers.ContractFactory(
      metadata.abi,
      metadata.bytecode,
      signer
    );

    let contract = await factory.deploy(...constructorArgs);
    console.log("Contract Address", contract.address);
    await contract.deployed();

    return { contract_address: contract.address, owner_address: signer };
  } catch (error) {
    console.error(error);
  }
}
