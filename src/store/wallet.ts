import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {PersistConfig} from 'redux-persist/es/types';
import {HDNodeWallet} from 'ethers';

interface Account {
  name: string;
  path: string;
  address: string;
}

interface State {
  encryptedMaster: string | null;
  accounts: Account[];
  error: string | null;
  isLocked: boolean;
}

const initialState: State = {
  encryptedMaster: null,
  accounts: [],
  isLocked: true,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {

    setEncryptedMaster(state, action: { payload: string }) {
      // Randomly generate wallet
      state.encryptedMaster = action.payload;
    },

    setLocked(state, action: { payload: boolean }) {
      state.isLocked = action.payload;
    },

    setError(state, action: { payload: string }) {
      state.error = action.payload;
    },

    generateAccount(state, action: { payload: HDNodeWallet }) {
      state.accounts.push({
        name: `Account ${state.accounts.length}`,
        path: action.payload.path as string,
        address: action.payload.address,
      });
    },
  }
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['accounts', 'encryptedMaster'],
} as PersistConfig<any>;

export const {generateAccount, setLocked, setError, setEncryptedMaster} = walletSlice.actions;

export default persistReducer(persistConfig, walletSlice.reducer);