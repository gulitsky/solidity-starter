import { subtask, types } from "hardhat/config";

subtask("print:amount", "Prints the currency amount")
  .addPositionalParam("amount", "Currency's amount")
  .addOptionalParam("symbol", "Currency's symbol", types.string)
  .addOptionalParam("decimals", "Currency's number of decimals", 18, types.int)
  .setAction(async ({ amount, symbol, decimals }, { ethers }) => {
    
  });
