import {JsonRpcProvider} from 'ethers';

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
}

if(!import.meta.env.VITE_ETH_TESTNET_URL) {
  throw new Error("Environment variable VITE_ETH_TESTNET_URL is missing");
}


if(!import.meta.env.VITE_BNB_TESTNET_URL) {
  throw new Error("Environment variable VITE_BNB_TESTNET_URL is missing");
}

export const NETWORKS: NetworkConfig[] = [
  {
    name: import.meta.env?.VITE_ETH_TESTNET_NAME ?? "Sepolia",
    rpcUrl: import.meta.env.VITE_ETH_TESTNET_URL, // Example public RPC
  },
  {
    name: import.meta.env?.VITE_BNB_TESTNET_NAME ?? "BNB Smart Chain Testnet",
    rpcUrl: import.meta.env.VITE_BNB_TESTNET_URL,
  },
];

export type ProviderConfig = {
  [key: string]: JsonRpcProvider;
}

export const getProviders = () => {
  const providers: ProviderConfig = {};
  for (const network of NETWORKS) {
    providers[network.name] = new JsonRpcProvider(network.rpcUrl);
  }
  return providers;
};