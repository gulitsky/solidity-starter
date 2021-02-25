import { task } from "hardhat/config";

task("block", "Prints the current block number", async (args, hre) => {
  console.log(await hre.ethers.provider.getBlockNumber());
});
