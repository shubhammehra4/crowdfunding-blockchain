const { delpoyContract } = require("./deploy");
const { getWeiFromEthers } = require("./ethersToWei");

async function deploy() {
  const deadlineDays = 10;
  const goal = getWeiFromEthers(10n);
  const fundRaising = await delpoyContract("FundRaising", [deadlineDays, goal]);

  return fundRaising;
}

deploy().then(async (fundRaising) => {
  console.log("Contract Successfully deployed!!");
  console.log(`Contract Address : ${fundRaising.address}`);
  console.log(`Owner Address : ${fundRaising.signer.address}`);
  console.log(await fundRaising.getDetails());
});
