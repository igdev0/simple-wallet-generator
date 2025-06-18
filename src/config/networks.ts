import {JsonRpcProvider} from 'ethers';

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
}

// Hardcoded API keys, I will disable this API key after I receive feedback.
export const NETWORKS: NetworkConfig[] = [
  {
    name: "Sepolia",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/sxSyhMABmXFYFkxAiZSr1uM6qP2twS4d",
  },
  {
    name: "BNB Smart Chain Testnet",
    rpcUrl: "https://bnb-testnet.g.alchemy.com/v2/sxSyhMABmXFYFkxAiZSr1uM6qP2twS4d",
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