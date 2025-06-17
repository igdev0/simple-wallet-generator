import {
  walletReducer,
  setEncryptedMaster,
  setLocked,
  setError,
  clearError,
  generateAccount,
  type Account,
} from './wallet'; // Adjust the path as necessary

const initialState = {
  encryptedMaster: null,
  accounts: [],
  isLocked: true,
  error: null,
};

describe('wallet reducer', () => {

  it('should handle setEncryptedMaster', () => {
    const newEncryptedMaster = 'someEncryptedMasterString';
    const action = setEncryptedMaster(newEncryptedMaster);
    const state = walletReducer(initialState, action);
    expect(state.encryptedMaster).toEqual(newEncryptedMaster);
  });

  it('should handle setLocked', () => {
    // Test setting to false
    let action = setLocked(false);
    let state = walletReducer(initialState, action);
    expect(state.isLocked).toEqual(false);

    // Test setting to true
    action = setLocked(true);
    state = walletReducer({ ...initialState, isLocked: false }, action); // Start with isLocked: false
    expect(state.isLocked).toEqual(true);
  });

  it('should handle setError', () => {
    const errorMessage = 'An error occurred!';
    const action = setError(errorMessage);
    const state = walletReducer(initialState, action);
    expect(state.error).toEqual(errorMessage);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Previous error' };
    const action = clearError();
    const state = walletReducer(stateWithError, action);
    expect(state.error).toBeNull();
  });

  it('should handle generateAccount', () => {
    const newAccount: Account = {
      name: 'Account 1',
      index: 0,
      path: "m/44'/60'/0'/0/0",
      address: '0x00000...',
    };
    const action = generateAccount(newAccount);
    const state = walletReducer(initialState, action);
    expect(state.accounts).toEqual([newAccount]);

    const anotherAccount: Account = {
      name: 'Account 2',
      index: 1,
      path: "m/44'/60'/0'/0/1",
      address: '0x00000...',
    };
    const stateWithOneAccount = { ...initialState, accounts: [newAccount] };
    const stateAfterAddingAnother = walletReducer(stateWithOneAccount, generateAccount(anotherAccount));
    expect(stateAfterAddingAnother.accounts).toEqual([newAccount, anotherAccount]);
  });
});