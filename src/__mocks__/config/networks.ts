import {NETWORKS} from '../../config/networks.ts';
import {JsonRpcProvider} from 'ethers';

export const getProviders = () => {
  const providers: { [key: string]: JsonRpcProvider } = {};
  for (const network of NETWORKS) {
    providers[network.name] = new JsonRpcProvider(network.rpcUrl) as keyof object;
  }
  return providers;
};