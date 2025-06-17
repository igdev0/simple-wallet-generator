import {JsonRpcProvider} from 'ethers';

export interface NetworkConfig {
  name: string;
  symbol: string;
  rpcUrl: string;
}

export const NETWORKS: NetworkConfig[] = [
  {
    name: "Sepolia",
    symbol: "ETH",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/sxSyhMABmXFYFkxAiZSr1uM6qP2twS4d", // Example public RPC
  },
  {
    name: "BNB Smart Chain Testnet",
    symbol: "ETH",
    rpcUrl: "https://bnb-testnet.g.alchemy.com/v2/sxSyhMABmXFYFkxAiZSr1uM6qP2twS4d",
  },
];


export const getProviders = () => {
  const providers: { [key: string]: JsonRpcProvider } = {};
  for (const network of NETWORKS) {
    providers[network.name] = new JsonRpcProvider(network.rpcUrl);
  }
  return providers;
};