import * as defaultExported from 'ethers';

describe('useWallet', () => {

  it('should be able to create a wallet', () => {
    const wallet = defaultExported.Wallet.createRandom();
    expect(wallet.getAddress()).toEqual('0xMockCreatedWalletAddress');
  });

});