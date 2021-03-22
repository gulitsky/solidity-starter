export interface InfuraKeys {
  projectId: string;
  projectSecret?: string;
  jwt?: string;
}

export interface AlchemyKeys {}

export type Network = "mainnet" | "ropsten" | "rinkeby" | "goerli" | "kovan";

const chainIds: Record<Network, number> = {
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
};

const rpcs: Record<Network, string> = {
  mainnet: "https://cloudflare-eth.com",
};

Object.entries(chainIds).map(([network, chainId]) => {});
/* const publicNetworks = INFURA_PROJECT_ID
  ? Object.keys(chainIds).reduce<Record<string, HttpNetworkUserConfig>>(
      (networks, network) => {
        if (isProduction() || network.isMainnet !== "mainnet") {
          networks[network] = {
            url: `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`,
            chainId: chainIds[network],
            accounts: {
              mnemonic: MNEMONIC,
            },
          };
          if (INFURA_PROJECT_SECRET) {
            const infuraProjectSecret = Buffer.from(
              `:${INFURA_PROJECT_SECRET}`,
            ).toString("base64");
            networks[network].httpHeaders = {
              Authorization: `Basic ${infuraProjectSecret}`,
            };
          } else if (INFURA_JWT) {
            networks[network].httpHeaders = {
              Authorization: `Bearer ${INFURA_JWT}`,
            };
          }
        }
        return networks;
      },
      {},
    )
  : {}; */
