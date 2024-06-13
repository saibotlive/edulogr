import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Incident {
  id: string;
  institutionId: string;
  childName: string;
  details: string;
  date: Date;
  status: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  comments: string;
}

export const incidentApi = createApi({
  reducerPath: 'incidentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/incidents' }),
  endpoints: (builder) => ({
    fetchIncidents: builder.query<Incident[], string | void>({
      query: (institutionId = '') => `${institutionId ? `?institutionId=${institutionId}` : ''}`,
    }),
    addIncident: builder.mutation<Incident, Partial<Incident>>({
      query: (incident) => ({
        url: '/',
        method: 'POST',
        body: incident,
      }),
    }),
    updateIncident: builder.mutation<Incident, Incident>({
      query: (incident) => ({
        url: `/${incident.id}`,
        method: 'PUT',
        body: incident,
      }),
    }),
  }),
});

export const { useFetchIncidentsQuery, useAddIncidentMutation, useUpdateIncidentMutation } = incidentApi;
