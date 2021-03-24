import "hardhat/types/config";

import { Currency } from ".";

declare module "hardhat/types/config" {
  interface HardhatNetworkUserConfig {
    nativeCurrency?: Currency;
  }

  interface HttpNetworkUserConfig {
    nativeCurrency?: Currency;
    faucet?: string;
  }

  interface HardhatNetworkConfig {
    nativeCurrency?: Currency;
  }

  interface HttpNetworkConfig {
    nativeCurrency?: Currency;
    faucet?: string;
  }
}
