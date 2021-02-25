import "hardhat/types/config";

import { Currency } from "./types";

declare module "hardhat/types/config" {
  interface HardhatNetworkUserConfig {
    nativeCurrency?: Currency;
  }

  interface HttpNetworkUserConfig {
    nativeCurrency?: Currency;
  }

  interface HardhatNetworkConfig {
    nativeCurrency?: Currency;
  }

  interface HttpNetworkConfig {
    nativeCurrency?: Currency;
  }
}
