import {createContext, useState} from 'react';
import {getProviders} from './config/networks.ts';
import type {HDNodeVoidWallet} from 'ethers';
import type {AppContext} from '../context.tsx';

export const Context = createContext<AppContext>({
  master: null,
  setMaster: () => {
  },
  rpcProviders: {},
});

const AppProvider = ({children}: { children: React.ReactNode }) => {
  const [master, setMaster] = useState<HDNodeVoidWallet | null>(null);
  return (
      <Context.Provider
          value={{
            master,
            setMaster: setMaster,
            rpcProviders: getProviders(),
          }}
      >
        {children}
      </Context.Provider>
  );
};

export default AppProvider;