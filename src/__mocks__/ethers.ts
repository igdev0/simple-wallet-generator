export * from "ethers";

export const mockWalletEncrypt = jest.fn();
export const mockWalletNeuter = jest.fn().mockImplementation(() => mockedNeuterWallet);
export const mockHDNodeWalletNeuter = jest.fn();
export const mockHDNodeWalletDeriveChild = jest.fn();
export const mockHDNodeWalletDerivePath = jest.fn();
export const mockJsonRpcProviderSend = jest.fn().mockResolvedValue(0);

export const mockedNeuterWallet = {
  address: '0xMockCreatedWalletAddress',
  index: 0,
  path: "m/44'/60'/0'/0/0",
  encrypt: mockWalletEncrypt,
  neuter: mockWalletNeuter,
  getAddress: jest.fn(() => "0xMockCreatedWalletAddress"),
}

export const Wallet = {
  createRandom: jest.fn(() => ({
    address: '0xMockCreatedWalletAddress',
    privateKey: '0xMockCreatedPrivateKey',
    index: 0,
    path: "m/44'/60'/0'/0/0",
    encrypt: mockWalletEncrypt,
    neuter: mockWalletNeuter,
    getAddress: jest.fn(() => "0xMockCreatedWalletAddress"),
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
};


export const JsonRpcProvider = jest.fn((url: string) => ({
  rpcUrl: url,
  send: mockJsonRpcProviderSend
}));
