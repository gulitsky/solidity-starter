import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

import "./tasks";

dotenv.config();
const {
  COIN_MARKET_CAP_API_KEY,
  ETHERSCAN_API_KEY,
  INFURA_PROJECT_ID = "84842078b09946638c03157f83405213",
  MNEMONIC,
  REPORT_GAS,
  SOLIDITY_VERSION = "0.8.7",
} = process.env;

if (!MNEMONIC) {
  console.error(
    "✖ Please set your MNEMONIC in environment variable or .env file",
  );
  process.exit(1);
}
const accounts = {
  count: 10,
  mnemonic: MNEMONIC,
};

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    currency: "USD",
    enabled: REPORT_GAS && REPORT_GAS === "true" ? true : false,
    src: "./contracts/",
  },
  solidity: {
    version: SOLIDITY_VERSION,
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    hardhat: {
      accounts,
      tags: ["local", "test"],
    },
    eth: {
      url: "https://cloudflare-eth.com",
      chainId: 1,
      accounts,
      tags: ["mainnet", "production"],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 3,
      accounts,
      tags: ["staging", "testnet"],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 4,
      accounts,
      tags: ["staging", "testnet"],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 5,
      accounts,
      tags: ["staging", "testnet"],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 42,
      accounts,
      tags: ["staging", "testnet"],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts,
      tags: ["mainnet", "production"],
    },
    "bsc-test": {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts,
      tags: ["staging", "testnet"],
    },
    matic: {
      url: "https://rpc-mainnet.matic.network",
      chainId: 137,
      accounts,
      tags: ["mainnet", "production"],
    },
    "matic-test": {
      url: "https://rpc-mumbai.matic.today",
      chainId: 80001,
      accounts,
      tags: ["staging", "testnet"],
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
