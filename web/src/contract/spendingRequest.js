import { BigNumber, ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";
import { getWei } from "../utils/currency";

export default async function createSpendingRequest(
  contract_address,
  description,
  recipient,
  valueinEthers,
  minimumVotePercent
) {
  const metadata = FundRaisignFactory;
  const web3Provider = window.ethereum;
  const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();
  const value = getWei(valueinEthers);

  const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
  await fundRaising.createSpendingRequest(description, recipient, value, minimumVotePercent);
  return true;
}
