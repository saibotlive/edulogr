import { configureStore } from '@reduxjs/toolkit';
import { institutionApi } from '../features/institution/institutionApi';
import { incidentApi } from '../features/incidents/incidentApi';
import authReducer from '../features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [institutionApi.reducerPath]: institutionApi.reducer,
    [incidentApi.reducerPath]: incidentApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(institutionApi.middleware, incidentApi.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production environments
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
