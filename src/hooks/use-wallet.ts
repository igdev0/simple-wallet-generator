import {useSelector} from 'react-redux';
import {type RootState, useAppDispatch} from '../store';
import {type HDNodeWallet, Wallet} from 'ethers';
import {generateAccount, setEncryptedMaster, setError, setLocked} from '../store/wallet.ts';
import {useState} from 'react';

export default function useWallet() {
  const store = useSelector((state: RootState) => state);
  const [master, setMaster] = useState<HDNodeWallet | null>(null);
  const dispatch = useAppDispatch();

  const generateRandomMasterEncrypted = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return
    }
    try {
      const encrypted = await Wallet.createRandom().encrypt(password);
      dispatch(setEncryptedMaster(encrypted));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const generateWallet = async () => {
    if (!master) {
      setError("Master is required");
      return;
    }
    const child = master.deriveChild(store.accounts.length);
    dispatch(generateAccount(child));
  };

  const getWallet = async (address: string) => {
    if (!master) {
      setError("Master is required");
      return;
    }
    const account = store.accounts.find(account => account.address === address);

    if (!account) {
      setError("Could not find account");
      return;
    }

    return master.derivePath(account.path);
  };

  const authenticate = async (formData: FormData) => {
    const password = formData.get("password") as string;
    if (!store.encryptedMaster) {
      setError("Master wallet does not exist");
      return
    }
    if (!password) {
      setError("Password is required");
      return
    }
    try {
      const decrypted = await Wallet.fromEncryptedJson(store.encryptedMaster as string, password);
      setMaster(decrypted as HDNodeWallet);
      dispatch(setLocked(false));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    ...store,
    master,
    authenticate,
    generateWallet,
    getWallet,
    generateRandomMasterEncrypted,
  };
}