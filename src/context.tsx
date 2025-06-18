import {createContext, type PropsWithChildren, useState} from 'react';
import {type HDNodeVoidWallet} from 'ethers';
import {getProviders} from './config/networks.ts';

export interface AppContext {
  master: HDNodeVoidWallet | null;
  setMaster: (master: HDNodeVoidWallet) => void;
  rpcProviders?: ReturnType<typeof getProviders>;
}

const initial: AppContext = {
  master: null,
  setMaster: (_) => {
  },
};

export const AppContext = createContext<AppContext>(initial);

const rpcProviders = getProviders();

export interface AppProviderProps extends PropsWithChildren {
  initialMaster?: HDNodeVoidWallet | null;
}

export default function AppProvider({children, initialMaster = null}: AppProviderProps) {
  const [master, setMaster] = useState<HDNodeVoidWallet | null>(initialMaster);
  return (
      <AppContext.Provider
          value={{master, setMaster, rpcProviders}}>{children}</AppContext.Provider>
  );
};