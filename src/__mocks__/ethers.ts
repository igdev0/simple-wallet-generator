const originalEthers = jest.requireActual('ethers'); // Keep original for utilities like formatEther, BigNumberish, etc.

const mockWalletEncrypt = jest.fn();
const mockWalletNeuter = jest.fn();
const mockHDNodeWalletNeuter = jest.fn();
const mockHDNodeWalletDeriveChild = jest.fn();
const mockHDNodeWalletDerivePath = jest.fn();
const mockJsonRpcProviderSend = jest.fn();
const ethers = {
  ...originalEthers,

  Wallet: {
    createRandom: jest.fn(() => ({
      address: '0xMockCreatedWalletAddress',
      privateKey: '0xMockCreatedPrivateKey',
      index: 0,
      path: "m/44'/60'/0'/0/0",
      encrypt: mockWalletEncrypt,
      neuter: mockWalletNeuter,
    })),

    fromEncryptedJson: jest.fn(() => Promise.resolve({
      address: '0xMockDecryptedHDNodeAddress',
      privateKey: '0xMockDecryptedHDPrivateKey',
      index: 0,
      path: "m/44'/60'/0'/0/0",
      deriveChild: mockHDNodeWalletDeriveChild,
      derivePath: mockHDNodeWalletDerivePath,
      neuter: mockHDNodeWalletNeuter,
    })),
  },

  // Mock JsonRpcProvider to control network calls
  JsonRpcProvider: jest.fn(() => ({
    send: mockJsonRpcProviderSend,
  })),
};

export default ethers;