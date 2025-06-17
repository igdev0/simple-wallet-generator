import {createContext, type PropsWithChildren, useState} from 'react';
import {type HDNodeWallet} from 'ethers';
import {getProviders} from './config/networks.ts';

interface AppContext {
  master: HDNodeWallet | null;
  setMaster: (master: HDNodeWallet) => void;
  rpcProviders?: ReturnType<typeof getProviders>;
}

const initial: AppContext = {
  master: null,
  setMaster: (_) => {},
};

export const AppContext = createContext<AppContext>(initial);

const rpcProviders = getProviders();

export default function AppProvider({children}: PropsWithChildren) {
  const [master, setMaster] = useState<HDNodeWallet | null>(null);
  return (
      <AppContext.Provider
          value={{master, setMaster, rpcProviders}}>{children}</AppContext.Provider>
  );
};