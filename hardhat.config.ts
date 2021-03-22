import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";

import "./types/type-extensions";
import "./tasks";

dotenv.config();
const {
  INFURA_PROJECT_ID = "84842078b09946638c03157f83405213",
  INFURA_PROJECT_SECRET,
  INFURA_JWT,
  MNEMONIC,
  NODE_ENV = "development",
  SOLIDITY_VERSION = "0.8.2",
} = process.env;

const isProduction = () => NODE_ENV === "production";

if (!MNEMONIC) {
  console.error(
    "✖ Please set your MNEMONIC in environment variable or .env file",
  );
  process.exit(1);
}

const config: HardhatUserConfig = {
  solidity: {
    version: SOLIDITY_VERSION,
    settings: {
      optimizer: {
        enabled: isProduction(),
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
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
};

export default config;
