import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { SERVER_URL } from '../../config';

interface IncidentStatistics {
  date: string;
  count: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}/api/incidents`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery,
  endpoints: (builder) => ({
    getIncidentStatistics: builder.query<IncidentStatistics[], void>({
      query: () => 'statistics',
    }),
  }),
});

export const { useGetIncidentStatisticsQuery } = statisticsApi;
