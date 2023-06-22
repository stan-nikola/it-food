import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import axios from 'axios';
import { authPresistedReducer } from './auth/authSlice';
import { dishReducer } from './dish/dishSlice';
import { orderReducer } from './order/orderSlice';

axios.defaults.baseURL = 'http://localhost:3000/api/';

export const store = configureStore({
  reducer: {
    auth: authPresistedReducer,
    dish: dishReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
