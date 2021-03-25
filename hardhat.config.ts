import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";
import "@nomiclabs/hardhat-waffle";
import "hardhat-jest-plugin";

import "./types/type-extensions";
import "./tasks";

dotenv.config();
const {
  INFURA_PROJECT_ID = "84842078b09946638c03157f83405213",
  INFURA_PROJECT_SECRET,
  INFURA_JWT,
  MNEMONIC,
  NODE_ENV = "development",
  OPTIMIZE = "true",
  OPTIMIZER_RUNS = "200",
  SOLIDITY_VERSION = "0.8.3",
} = process.env;

const isProduction = () => NODE_ENV === "production";

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
    mainnet: {
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
    "bsc-testnet": {},
  },
  paths: {
    tests: "./tests/",
  },
  typechain: {
    target: "ethers-v5",
  },
};

export default config;
