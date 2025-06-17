import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './app.tsx';
import store, {persistor} from './store';

import './index.css';
import {PersistGate} from 'redux-persist/integration/react';
import AppProvider from './context.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppProvider>
            <App/>
          </AppProvider>
        </PersistGate>
      </Provider>
    </StrictMode>,
);
