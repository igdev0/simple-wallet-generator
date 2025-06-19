import {useSelector} from 'react-redux';
import {type RootState, useAppDispatch} from '../store';
import {ethers, HDNodeWallet, Wallet} from 'ethers';
import {clearError, generateAccount, setEncryptedMaster, setError, setLocked} from '../store/wallet.ts';
import {useContext} from 'react';
import {AppContext} from '../context.tsx';

export default function useWallet() {
  const {master, setMaster, rpcProviders} = useContext(AppContext);
  const store = useSelector((state: RootState) => ({
    accounts: state.accounts,
    encryptedMaster: state.encryptedMaster,
    error: state.error,
    isLocked: state.isLocked,
  }));
  const dispatch = useAppDispatch();

  const getBalances = async (address: string) => {
    const balances: { [key: string]: string } = {};
    for (let network in rpcProviders) {
      const provider = rpcProviders[network];
      const balance = await provider.send("eth_getBalance", [address, "latest"]);
      balances[network] = ethers.formatEther(balance);
    }
    return balances;
  };

  const generateRandomMasterEncrypted = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (!password) {
      dispatch(setError("Password is required"));
      return;
    }
    if (password !== confirmPassword) {
      dispatch(setError("Passwords don't match"));
      return;
    }
    try {
      const wallet = Wallet.createRandom();
      const encrypted = await wallet.encrypt(password);
      dispatch(setEncryptedMaster(encrypted));
      dispatch(setLocked(false));
      dispatch(generateAccount({
        index: wallet.index,
        address: wallet.address,
        name: `Account ${wallet.index}`
      }));
      setMaster(wallet.neuter());
      dispatch(clearError());
    } catch (err) {
      dispatch(setError((err as Error).message));
    }
  };


  const generateWallet = async () => {
    if (!master) {
      dispatch(setError("Master is required"));
      return;
    }
    const wallet = master.deriveChild(store.accounts.length + 1);
    dispatch(generateAccount({
      index: wallet.index,
      address: wallet.address,
      name: `Account ${wallet.index}`
    }));
  };

  const authenticate = async (formData: FormData) => {
    const password = formData.get("password") as string;
    if (!store.encryptedMaster) {
      dispatch(setError("Master wallet does not exist"));
      return;
    }
    if (!password) {
      dispatch(setError("Password is required"));
      return;
    }
    try {
      const decrypted = (await Wallet.fromEncryptedJson(store.encryptedMaster as string, password)) as HDNodeWallet;
      setMaster(decrypted.neuter());
      dispatch(setLocked(false));
      dispatch(clearError());
    } catch (err) {
      dispatch(setError((err as Error).message));
    }
  };

  const getPrivateKey = async (address: string, password: string) => {
    const account = store.accounts.find(account => account.address === address);
    if (!account) {
      dispatch(setError("Could not find account address"));
      return;
    }
    if (!master) {
      dispatch(setError("Master is not unlocked"));
      return;
    }

    try {
      const decryptedWallet = await Wallet.fromEncryptedJson(store.encryptedMaster as string, password) as HDNodeWallet;
      if (decryptedWallet.index === account.index) {
        return decryptedWallet.privateKey;
      }
      dispatch(clearError());
      return decryptedWallet.derivePath(`${account.index}`).privateKey;
    } catch (err) {
      dispatch(setError((err as Error).message));
    }
  };

  const clearErrors = () => {
    dispatch(clearError());
  };

  return {
    ...store,
    master,
    getBalances,
    clearErrors,
    authenticate,
    getPrivateKey,
    generateWallet,
    generateRandomMasterEncrypted,
  };
}