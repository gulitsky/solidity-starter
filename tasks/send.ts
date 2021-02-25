import { task } from "hardhat/config";

task("send", "Prints the current block number", async (args, hre) => {
  console.log(await hre.ethers.provider.getBlockNumber());
});
