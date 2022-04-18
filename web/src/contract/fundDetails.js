import { BigNumber, ethers } from "ethers";
import FundRaisignFactory from "../assets/FundRaising.json";

export default async function getFundDeatils(contract_address) {
  const metadata = FundRaisignFactory;
  const web3Provider = window.ethereum;
  const signer = new ethers.providers.Web3Provider(web3Provider).getSigner();

  const fundRaising = new ethers.Contract(contract_address, metadata.abi, signer);
  const fundDetails = await fundRaising.getDetails();

  const [owner, raisedAmount, totalContributors, balance, contributors, requests] = fundDetails;

  const spendingRequests = requests.map((request) => ({
    description: request[0],
    value: BigNumber.from(request[1])
      .div(BigNumber.from(BigInt(1e18)))
      .toNumber(),
    recipient: request[2],
    voteAmount: BigNumber.from(request[3])
      .div(BigNumber.from(BigInt(1e18)))
      .toNumber(),
    completed: request[4],
    voters: request[5].map((v) => v.toLowerCase()),
  }));

  console.log(spendingRequests);

  return {
    owner,
    raisedAmount: ethers.utils.formatEther(raisedAmount),
    totalContributors: BigNumber.from(totalContributors).toNumber(),
    balance: ethers.utils.formatEther(balance),
    contributors: contributors.map((c) => c.toLowerCase()),
    spendingRequests,
  };
}
