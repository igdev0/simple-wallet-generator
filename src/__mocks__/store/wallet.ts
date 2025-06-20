import { jest } from '@jest/globals';

export let mockWalletState: any = {
  encryptedMaster: null,
  accounts: [],
  isLocked: true,
  error: null,
};

export const setEncryptedMaster = jest.fn((payload: string) => ({
  type: 'wallet/setEncryptedMaster',
  payload,
}));
export const setLocked = jest.fn((payload: boolean) => ({
  type: 'wallet/setLocked',
  payload,
}));
export const setError = jest.fn((payload: string) => ({
  type: 'wallet/setError',
  payload,
}));
export const clearError = jest.fn(() => ({
  type: 'wallet/clearError',
}));
export const generateAccount = jest.fn((payload: any) => ({ // Use 'any' or define Account interface
  type: 'wallet/generateAccount',
  payload,
}));


export const walletReducer = jest.fn((state: any = mockWalletState, action:any) => {
  switch (action.type) {
    case 'wallet/setEncryptedMaster':
      return { ...state, encryptedMaster: action.payload };
    case 'wallet/setLocked':
      return { ...state, isLocked: action.payload };
    case 'wallet/setError':
      return { ...state, error: action.payload };
    case 'wallet/clearError':
      return { ...state, error: null };
    case 'wallet/generateAccount':
      return { ...state, accounts: [...state.accounts, action.payload] };
    default:
      return state;
  }
});


export default walletReducer;

export const resetWalletMocks = (initialState?: any) => {
  mockWalletState = initialState || {
    encryptedMaster: null,
    accounts: [],
    isLocked: true,
    error: null,
  };
  setEncryptedMaster.mockClear();
  setLocked.mockClear();
  setError.mockClear();
  clearError.mockClear();
  generateAccount.mockClear();
  walletReducer.mockClear();
};