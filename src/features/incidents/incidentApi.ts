import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { SERVER_URL } from '../../config';

interface Incident {
  id: string;
  institutionId: string;
  childName: string;
  details: string;
  date: Date;
  status: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  parentSignature?: string;
  parentSignatureType?: 'handwritten' | 'typed';
  signedByParent?: boolean;
  comments?: string;
}

interface ReportIncidentRequestBody {
  institution: string;
  childName: string;
  details: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  comments?: string;
}

interface SignIncidentRequestBody {
  parentSignature: string;
  parentSignatureType: 'handwritten' | 'typed';
}

// Custom baseQuery function to include the token in the headers
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

export const incidentApi = createApi({
  reducerPath: 'incidentApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchIncidents: builder.query<Incident[], string | void>({
      query: (institutionId = '') => `${institutionId ? `?institutionId=${institutionId}` : ''}`,
    }),
    addIncident: builder.mutation<Incident, Partial<ReportIncidentRequestBody>>({
      query: (incident) => ({
        url: '/',
        method: 'POST',
        body: incident,
      }),
    }),
    signIncident: builder.mutation<
      Incident,
      { id: string; parentSignature: string; parentSignatureType: 'handwritten' | 'typed' }
    >({
      query: ({ id, parentSignature, parentSignatureType }) => ({
        url: `/sign/${id}`,
        method: 'POST',
        body: { parentSignature, parentSignatureType },
      }),
    }),
    getIncidentById: builder.query<Incident, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useFetchIncidentsQuery, useAddIncidentMutation, useSignIncidentMutation, useGetIncidentByIdQuery } =
  incidentApi;
