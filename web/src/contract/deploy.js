import { ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function deployContarct(...constructorArgs) {
  try {
    const metadata = FundRaisignFactory;
    const web3Provider = window.ethereum;
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

    let factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);

    let contract = await factory.deploy(...constructorArgs);
    await contract.deployed();
    const owner_address = await contract.signer.getAddress();

    return { contract_address: contract.address, owner_address };
  } catch (error) {
    console.error(error);
  }
}
