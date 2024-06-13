import { configureStore } from '@reduxjs/toolkit';
import { institutionApi } from '../features/institution/institutionApi';
import { incidentApi } from '../features/incidents/incidentApi';

export const store = configureStore({
  reducer: {
    [institutionApi.reducerPath]: institutionApi.reducer,
    [incidentApi.reducerPath]: incidentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(institutionApi.middleware, incidentApi.middleware),
});
