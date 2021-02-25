export interface Currency {
  address?: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface JsonRpc {
  url?: string;
  httpHeaders?: { [name: string]: string };
  timeout?: number;
}

export type FaucetUrl = string;
