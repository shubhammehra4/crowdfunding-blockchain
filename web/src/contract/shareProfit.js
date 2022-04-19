import { ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";
import { getWei } from "../utils/currency";

export default async function shareProfit(contract_address, amountinEthers) {
  try {
    const metadata = FundRaisignFactory;
    const web3Provider = window.ethereum;
    const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

    const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
    const amount = getWei(amountinEthers);

    await fundRaising.shareProfit({
      value: amount,
    });
  } catch (error) {
    console.log(error);
  }
}
