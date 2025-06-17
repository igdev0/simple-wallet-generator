import {createContext, type PropsWithChildren, useState} from 'react';
import {type HDNodeVoidWallet} from 'ethers';
import {getProviders} from './config/networks.ts';

interface AppContext {
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

export default function AppProvider({children}: PropsWithChildren) {
  const [master, setMaster] = useState<HDNodeVoidWallet | null>(null);
  return (
      <AppContext.Provider
          value={{master, setMaster, rpcProviders}}>{children}</AppContext.Provider>
  );
};