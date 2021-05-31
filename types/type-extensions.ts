import "hardhat/types/config";

export interface Currency {
  address?: string;
  name: string;
  symbol: string;
  decimals: number;
}

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
