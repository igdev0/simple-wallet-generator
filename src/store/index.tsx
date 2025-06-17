import {configureStore} from "@reduxjs/toolkit";
import wallet from './wallet.ts';
import {persistStore} from 'redux-persist';
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: wallet,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true
      }
    });
  }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>;

export const persistor = persistStore(store);

export default store;