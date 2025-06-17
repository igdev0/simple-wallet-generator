import "./app.css";
import useWallet from './hooks/use-wallet.ts';


function App() {
  const wallet = useWallet();
  return (
      <div className="app">
        {wallet.error && <span className="error">{wallet.error}</span>}
        {
          !wallet.encryptedMaster ? (

              <form className="wallet" action={wallet.generateRandomMasterEncrypted}>
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
              <form action={wallet.generateWallet}>
                <button>Generate wallet</button>
                <h1>Generate wallet</h1>
                {
                  wallet.accounts.map((account) => (
                      <div key={account.address}><h3>{account.name}</h3>{account.address}</div>
                  ))
                }
              </form>
        }
      </div>
  );
}

export default App;
