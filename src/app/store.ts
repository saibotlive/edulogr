import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '../features/snackbar/snackbarSlice';
import { institutionApi } from '../features/institution/institutionApi';
import { incidentApi } from '../features/incidents/incidentApi';
import authReducer from '../features/auth/authSlice';
import { statisticsApi } from '../features/statistics/statisticsApi';

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    [institutionApi.reducerPath]: institutionApi.reducer,
    [incidentApi.reducerPath]: incidentApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(institutionApi.middleware, incidentApi.middleware, statisticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
