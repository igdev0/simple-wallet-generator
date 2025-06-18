import "./app.css";
import useWallet from './hooks/use-wallet.ts';
import {type Account} from './store/wallet.ts';
import {useEffect, useState} from 'react';

interface WalletUIProps {
  account: Account;
}

function WalletUI({account}: WalletUIProps) {
  const wallet = useWallet();
  const [privateKey, setPrivateKey] = useState<string | null>();
  const [unlockPrivateKey, setUnlockPrivateKey] = useState<boolean>(false);
  const [balances, setBalances] = useState<Awaited<ReturnType<typeof wallet.getBalances>>>();

  const getPrivateKey = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const pk = await wallet.getPrivateKey(account.address, password);
    setPrivateKey(pk);
    setUnlockPrivateKey(false);
  };

  const refreshBalances = () => {
    wallet.getBalances(account.address).then(setBalances);
  };

  useEffect(() => {
    wallet.getBalances(account.address).then(setBalances);
  }, [account]);

  return (
      <div className="wallet-card">

        <div key={account.address}>
          <h3>{account.name}</h3>
          <p><strong className="key">✉️: {account.address}</strong></p>
          <h3>Balances:</h3>
          {balances && Object.keys(balances).map((key: string) => (
              <p key={key}>
                {key} : {balances[key]}
              </p>
          ))}
          {privateKey && <div><strong className="key">🔐: {privateKey}</strong></div>}
          {
              unlockPrivateKey && (
                  <form action={getPrivateKey}>
                    <label>Your password</label>
                    <input type="password" autoFocus id="password" name="password" placeholder="Password" required/>
                    <button data-testid="submit-password">Submit</button>
                  </form>
              )
          }
          <div className="wallet-card-buttons">
            {!privateKey && !unlockPrivateKey &&
                <button data-testid="see-private-key" onClick={() => setUnlockPrivateKey(true)}>👀 See Private key</button>}
            {privateKey && <button data-testid="hide-private-key" onClick={() => setPrivateKey(null)}>Hide private key 🔐</button>}
            <button data-testid="refresh-balance" onClick={refreshBalances}>Refresh Balance</button>
          </div>
        </div>
      </div>
  );
}

function App() {
  const wallet = useWallet();
  return (
      <div className="app">
        {wallet.error && <span className="error">{wallet.error}
            <button onClick={wallet.clearErrors}>&times;</button></span>}
        {
          !wallet.encryptedMaster ? (

              <form className="create-master-wallet" action={wallet.generateRandomMasterEncrypted}>
                <h1>Create master</h1>
                <fieldset>
                  <label htmlFor="password">
                    Password:
                  </label>
                  <input type="password" id="password" name="password" placeholder="Enter password"/>
                </fieldset>
                <fieldset>
                  <label htmlFor="confirm-password">
                    Confirm Password:
                  </label>
                  <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password"/>
                </fieldset>
                <button>Generate wallet</button>
              </form>
          ) : wallet.isLocked ? (

                  <form action={wallet.authenticate}>
                    <h1>Login to your master wallet</h1>
                    <fieldset>
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" placeholder="Enter password"/>
                    </fieldset>
                    <button data-testid="sign-in">Sign in</button>
                  </form>
              ) :
              <>
                <button data-testid="generate-new-wallet" onClick={wallet.generateWallet}>Generate wallet</button>
                <h1>Your wallets</h1>
                <div className="wallets">
                  {
                    wallet.accounts.map((account) => (
                        <WalletUI account={account}/>
                    ))
                  }
                </div>
              </>
        }
      </div>
  );
}

export default App;
