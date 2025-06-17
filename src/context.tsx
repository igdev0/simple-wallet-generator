import {createContext, type PropsWithChildren, useState} from 'react';
import type {HDNodeWallet} from 'ethers';

interface AppContext {
  master: HDNodeWallet | null;
  setMaster: (master: HDNodeWallet) => void;
}

const initial: AppContext = {
  master: null,
  setMaster: (_) => {},
};

export const AppContext = createContext<AppContext>(initial);

export default function AppProvider({children}: PropsWithChildren) {
  const [master, setMaster] = useState<HDNodeWallet | null>(null);


  return (
      <AppContext.Provider value={{master, setMaster}}>{children}</AppContext.Provider>
  );
};