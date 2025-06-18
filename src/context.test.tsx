import {act, render, screen} from '@testing-library/react';
import AppProvider, {AppContext} from './context.tsx';
import * as React from 'react';
import {useContext} from 'react';
import {Wallet} from 'ethers';
import {mockedNeuterWallet} from './__mocks__/ethers.ts';

const Consumer = () => {
  const {rpcProviders, setMaster, master} = useContext(AppContext);
  const onClick = () => {
    const wallet = Wallet.createRandom().neuter();
    setMaster(wallet);
  };
  return (
      <div>
        <div data-testid="master">{master ? "set" : "null"}</div>
        <div data-testid="rpcProviders">{rpcProviders ? "set" : "null"}</div>
        <button data-testid="button" onClick={onClick}>Btn</button>
      </div>
  );
};

describe('AppContext renders', () => {
  it('should initialize context', () => {

    render(<AppProvider><Consumer/></AppProvider>);
    expect(screen.getByTestId('master').textContent).toEqual('null');
    expect(screen.getByTestId('rpcProviders').textContent).toEqual('set');

  });

  it('should be able to set master wallet', () => {
    const setState = jest.fn();

    jest
        .spyOn(React, 'useState')
        // @ts-expect-error
        .mockImplementationOnce((initState: any) => [initState, setState]);
    render(<AppProvider><Consumer/></AppProvider>);

    act(() => {
      screen.getByTestId("button").click();
      expect(setState).toHaveBeenCalledWith(mockedNeuterWallet);
    });
  });
});