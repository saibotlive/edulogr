import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IncidentStatistics {
  date: string;
  count: number;
}

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    getIncidentStatistics: builder.query<IncidentStatistics[], void>({
      query: () => 'incidents/statistics',
    }),
  }),
});

export const { useGetIncidentStatisticsQuery } = statisticsApi;
