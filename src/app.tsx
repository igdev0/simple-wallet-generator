import "./app.css";
import useWallet from './hooks/use-wallet.ts';
import {type Account} from './store/wallet.ts';
import {useState} from 'react';

interface WalletUIProps {
  account: Account;
}

function WalletUI({account}: WalletUIProps) {
  const wallet = useWallet();
  const [privateKey, setPrivateKey] = useState<string | null>();
  const [unlockPrivateKey, setUnlockPrivateKey] = useState<boolean>(false);

  const getPrivateKey = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const pk = await wallet.getPrivateKey(account.address, password);
    setPrivateKey(pk);
    setUnlockPrivateKey(false);
  };

  return (
      <div className="wallet-card">

        <div key={account.address}>
          <h3>{account.name}</h3>
          <p><strong>✉️: {account.address}</strong></p>
          {privateKey && <p><strong>🔐: {privateKey}</strong></p>}
          {
              unlockPrivateKey && (
                  <form action={getPrivateKey}>
                    <label>Your password</label>
                    <input type="password" autoFocus id="password" name="password" placeholder="Password" required/>
                    <button>Submit</button>
                  </form>
              )
          }
          {!privateKey && !unlockPrivateKey && <button onClick={() => setUnlockPrivateKey(true)}>👀 See Private key</button>}
          {privateKey && <button onClick={() => setPrivateKey(null)}>Hide private key 🔐</button>}
        </div>
      </div>
  );
}

function App() {
  const wallet = useWallet();
  return (
      <div className="app">
        {wallet.error && <span className="error">{wallet.error}<button onClick={wallet.clearErrors}>&times;</button></span>}
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
                    <button>Sign in</button>
                  </form>
              ) :
              <>
                <button onClick={wallet.generateWallet}>Generate wallet</button>
                <h1>Generate wallet</h1>
                {
                  wallet.accounts.map((account) => (
                      <WalletUI account={account}/>
                  ))
                }
              </>
        }
      </div>
  );
}

export default App;
