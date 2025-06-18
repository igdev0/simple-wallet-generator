import {mockJsonRpcProviderSend} from '../__mocks__/ethers.ts';
import {getProviders} from './networks.ts';

describe("Network config test", () => {

  it('should be able to getProviders()', () => {
    const providers = getProviders();
    expect(Object.keys(providers).length).toEqual(2);

    for(const provider in providers) {
      providers[provider].send("0x000", []);
    }
    expect(mockJsonRpcProviderSend).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    mockJsonRpcProviderSend.mockClear();
  })

})