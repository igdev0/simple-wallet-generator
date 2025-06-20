import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {PersistConfig} from 'redux-persist/es/types';

export interface Account {
  name: string;
  index: number;
  address: string;
}

export interface WalletStoreState {
  encryptedMaster: string | null;
  accounts: Account[];
  error: string | null;
  isLocked: boolean;
}

export const initialState: WalletStoreState = {
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

    clearError(state) {
      state.error = null;
    },

    generateAccount(state, action: { payload: Account }) {
      state.accounts.push(action.payload);
    },
  }
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['accounts', 'encryptedMaster'],
} as PersistConfig<any>;

export const {generateAccount, setLocked, setError, setEncryptedMaster, clearError} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;

export default persistReducer(persistConfig, walletSlice.reducer);