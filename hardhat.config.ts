import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";

import "./types/type-extensions";
import "./tasks";

dotenv.config();
const {
  MNEMONIC,
  OPTIMIZE = "true",
  OPTIMIZER_RUNS = "200",
  SOLIDITY_VERSION = "0.8.4",
} = process.env;

if (!MNEMONIC) {
  console.error(
    "✖ Please set your MNEMONIC in environment variable or .env file",
  );
  process.exit(1);
}
const accounts = {
  mnemonic: MNEMONIC,
};

const config: HardhatUserConfig = {
  solidity: {
    version: SOLIDITY_VERSION,
    settings: {
      optimizer: {
        enabled: OPTIMIZE && OPTIMIZE === "true" ? true : false,
        runs: parseInt(OPTIMIZER_RUNS),
      },
    },
  },
  networks: {
    hardhat: {
      accounts,
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
    },
    ethereum: {
      url: "https://cloudflare-eth.com",
      chainId: 1,
      accounts,
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
    },
    bsc: {
      url: "https://bsd-dataseed.binance.org",
      chainId: 56,
      accounts,
      nativeCurrency: {
        name: "Binance Smart Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
    },
  },
  paths: {
    tests: "./tests/",
  },
  typechain: {
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
