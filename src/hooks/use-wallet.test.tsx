import {renderHook} from '@testing-library/react';
import useWallet from './use-wallet.ts';
import {mockedEncryptedMasterWallet, mockWalletEncrypt} from '../__mocks__/ethers.ts';
import {mockedDispatch} from '../__mocks__/react-redux.tsx';
import {setEncryptedMaster, setError} from '../__mocks__/store/wallet.ts';


describe('useWallet', () => {

  describe('generateMasterWallet', () => {

    it('should be able to generate master wallet', async () => {
      const {result} = renderHook(() => useWallet());
      const data = new FormData();
      data.append('password', "password");
      data.append('confirm-password', "password");

      await result.current.generateRandomMasterEncrypted(data);
      expect(mockWalletEncrypt).toHaveBeenCalledWith(data.get("password"));
      expect(mockedDispatch).toHaveBeenCalledTimes(4);
      expect(mockedDispatch).toHaveBeenCalledWith(setEncryptedMaster(mockedEncryptedMasterWallet));
      mockedDispatch.mockClear();
    });

    it('should not generate master wallet if the passwords don\'t match ', async () => {
      const {result} = renderHook(() => useWallet());
      const data = new FormData();
      data.append('password', "firstPassword");
      data.append('confirm-password', "secondPassword");
      await result.current.generateRandomMasterEncrypted(data);

      expect(mockedDispatch).toHaveBeenCalledWith(setError("Passwords don't match"));
    });
  });
});