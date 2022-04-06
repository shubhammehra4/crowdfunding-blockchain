const { delpoyContract } = require("./deploy");
const { getWeiFromEthers } = require("./ethersToWei");
const { getDeadline } = require("./getDeadline");

async function deploy() {
  const deadlineDays = getDeadline(10);
  const goal = getWeiFromEthers(10n);
  const fundRaising = await delpoyContract("FundRaising", [deadlineDays, goal]);

  return fundRaising;
}

async function getDetails(fundRaising) {
  console.log("Contract Successfully deployed!!");
  console.log(`Contract Address : ${fundRaising.address}`);
  console.log(`Owner Address : ${fundRaising.signer.address}`);
  console.log(await fundRaising.getDetails());
}

deploy().then(getDetails);
