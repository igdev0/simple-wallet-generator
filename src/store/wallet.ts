import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type {PersistConfig} from 'redux-persist/es/types';

export interface WalletStore {
}

const initialState: WalletStore = {};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {}
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
} as PersistConfig<any>;

export default persistReducer(persistConfig, walletSlice.reducer);