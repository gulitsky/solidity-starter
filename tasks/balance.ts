// import { subtask, task, types } from "hardhat/config";

/* task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address or index", 0)
  .setAction(async ({ account }, { ethers }) => {
    let balance;
    if (ethers.utils.isAddress(account)) {
      balance = await ethers.provider.getBalance(account);
    } else {
      const accounts = await ethers.getSigners();
      if ()
      balance = await accounts[account].getBalance();
    }
    console.log(
      `${ethers.utils.formatUnits(balance, "ether")} ${
        ethers.constants.EtherSymbol
      }`,
    );
  }); */

/* subtask("balance:address", "Prints the balance of an account with index")
  .addPositionalParam("index", "The account's index", 0, types.int)
  .add
  .setAction(async ({ index }, { ethers }) => {
    const accounts = await ethers.getSigners();
    if (index < accounts.length) {
      const balance = await accounts[index].getBalance();
    }
  });
 */
