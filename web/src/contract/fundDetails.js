import { BigNumber, ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function getFundDeatils(contract_address) {
  const metadata = FundRaisignFactory;
  const web3Provider = window.ethereum;
  const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

  const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
  const fundDetails = await fundRaising.getDetails();

  const [
    owner,
    raisedAmount,
    totalContributors,
    balance,
    contributors,
    spendingRequestsDescription,
    spendingRequestsValue,
    spendingRequestsRecipients,
    spendingRequestsStatus,
  ] = fundDetails;

  const spendingRequests = [];
  for (let i = 0; i < spendingRequestsDescription.length; i++) {
    spendingRequests.push({
      description: spendingRequestsDescription[i],
      value: spendingRequestsValue[i],
      recipient: spendingRequestsRecipients[i],
      status: spendingRequestsStatus[i],
    });
  }

  return {
    owner,
    raisedAmount: ethers.utils.formatEther(raisedAmount),
    totalContributors: BigNumber.from(totalContributors).toNumber(),
    balance: ethers.utils.formatEther(balance),
    contributors,
    spendingRequests,
  };
}
