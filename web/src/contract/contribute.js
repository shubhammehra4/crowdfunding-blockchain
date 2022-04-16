import { ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";
import { getWei } from "../utils/currency";

export default async function contribute(contract_address, contributor_address, amountinEthers) {
  try {
    const metadata = FundRaisignFactory;
    const web3Provider = window.ethereum;
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

    const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
    const amount = getWei(amountinEthers);
    // console.log(fundRaising.contribute());

    await fundRaising.contribute({
      value: amount,
    });
  } catch (error) {
    console.log(error);
  }
}
