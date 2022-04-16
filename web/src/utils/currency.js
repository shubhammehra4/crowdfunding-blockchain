import { BigNumber } from "ethers";

/**
 * Convert ETH to WEI
 * @param {number} ethers
 */
export function getWei(ethers) {
  let divider = 1;
  while (ethers !== Math.floor(ethers)) {
    ethers *= 10;
    divider *= 10;
  }

  return BigNumber.from(ethers)
    .mul(BigNumber.from(BigInt(1e18)))
    .div(BigNumber.from(divider));
}

/**
 * Convert WEI to ETH
 * @param {BigNumber} wei
 */
export function getEthers(wei) {
  return BigNumber.from(wei)
    .div(BigNumber.from(BigInt(1e18)))
    .toNumber();
}
