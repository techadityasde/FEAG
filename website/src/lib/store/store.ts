import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import onboardingReducer from "./onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
