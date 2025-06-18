import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import type {WalletStoreState} from '../../store/wallet.ts';

export let mockState: WalletStoreState = {
  accounts: [],
  isLocked: true,
  error: null,
  encryptedMaster: null,
};

export const persistor = {
  persist: jest.fn(),
  purge: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
};

export const mockReducer = jest.fn(() => {
  return mockState;
});

export const mockStore = configureStore({
  reducer: mockReducer,
  middleware: (getDefaultMiddleware) => {
    // Keep serializableCheck for consistency, but it won't do much with a mock reducer
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true
      }
    });
  }
});

export type RootState = ReturnType<typeof mockStore.getState>;

export const useAppDispatch = useDispatch;

export default mockStore