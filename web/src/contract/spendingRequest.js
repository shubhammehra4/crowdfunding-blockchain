import { BigNumber, ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function createSpendingRequest(contract_address, ...args) {
  const metadata = FundRaisignFactory;
  const web3Provider = window.ethereum;
  const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

  const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
  await fundRaising.createSpendingRequest(...args);
  return true;
}
