import * as defaultExported from 'ethers';
import {renderHook} from '@testing-library/react';
import useWallet from './use-wallet.ts';
import {mockWalletEncrypt} from '../__mocks__/ethers.ts';


describe('useWallet', () => {

  it('should be able to create a wallet', () => {
    const wallet = defaultExported.Wallet.createRandom();
    expect(wallet.getAddress()).toEqual('0xMockCreatedWalletAddress');

  });


  it('should be able to generate master wallet', () => {
    const {result} = renderHook(() => useWallet());
    const data = new FormData();
    data.append('password', "password");
    data.append('confirm-password', "password");

    result.current.generateRandomMasterEncrypted(data);
    expect(mockWalletEncrypt).toHaveBeenCalledWith(data.get("password"));
  });

});