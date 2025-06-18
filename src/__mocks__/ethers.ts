export * from "ethers";

export const mockedEncryptedMasterWallet = "encryptedJSONdata";

export const mockWalletNeuter = jest.fn().mockImplementation(() => mockedNeuterWallet);
export const mockHDNodeWalletNeuter = jest.fn();
export const mockHDNodeWalletDeriveChild = jest.fn().mockImplementation((index) => (
    {
      address: '0xMockDecryptedHDNodeAddress',
      privateKey: '0xMockDecryptedHDPrivateKey',
      index,
      path: "m/44'/60'/0'/0/0",
      derivePath: mockHDNodeWalletDerivePath,
      deriveChild: mockHDNodeWalletDeriveChild,
      neuter: mockHDNodeWalletNeuter,
    }
));
export const mockHDNodeWalletDerivePath = jest.fn();
export const mockJsonRpcProviderSend = jest.fn().mockResolvedValue(0);
export const mockWalletEncrypt = jest.fn().mockResolvedValue(mockedEncryptedMasterWallet);

export const Wallet = {
  createRandom: jest.fn(() => (mockedWallet)),

  fromEncryptedJson: jest.fn(() => Promise.resolve({
    address: '0xMockDecryptedHDNodeAddress',
    privateKey: '0xMockDecryptedHDPrivateKey',
    index: 0,
    path: "m/44'/60'/0'/0/0",
    derivePath: mockHDNodeWalletDerivePath,
    deriveChild: mockHDNodeWalletDeriveChild,
    neuter: mockHDNodeWalletNeuter,
  })),
};

export const mockedNeuterWallet = {
  address: '0xMockCreatedWalletAddress',
  index: 0,
  path: "m/44'/60'/0'/0/0",
  encrypt: mockWalletEncrypt,
  deriveChild: mockHDNodeWalletDeriveChild,
  neuter: mockWalletNeuter,
  getAddress: jest.fn(() => "0xMockCreatedWalletAddress"),
};

export const mockedWallet = {
  address: '0xMockCreatedWalletAddress',
  privateKey: '0xMockCreatedPrivateKey',
  index: 0,
  path: "m/44'/60'/0'/0/0",
  encrypt: mockWalletEncrypt,
  neuter: mockWalletNeuter,
  deriveChild: mockHDNodeWalletDeriveChild,
  getAddress: jest.fn(() => "0xMockCreatedWalletAddress"),
};

export const JsonRpcProvider = jest.fn((url: string) => ({
  rpcUrl: url,
  send: mockJsonRpcProviderSend
}));
