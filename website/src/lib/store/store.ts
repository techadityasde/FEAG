import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from "./apiSlice";
import onboardingReducer from "./onboardingSlice";
import authReducer from "./authSlice";
import transactionReducer from "./transactionSlice";
import orderReducer from "./orderSlice";
import locationReducer from "./locationSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  transactions: transactionReducer,
  orders: orderReducer,
  location: locationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'onboarding', 'transactions', 'orders', 'location'], // persist auth, onboarding, transactions, orders, and location
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
