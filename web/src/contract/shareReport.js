import { ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function shareReport(contract_address, link) {
  try {
    const metadata = FundRaisignFactory;
    const web3Provider = window.ethereum;
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

    const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);

    await fundRaising.shareReport(link);
  } catch (error) {
    console.log(error);
  }
}
