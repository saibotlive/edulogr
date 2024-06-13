import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Institution {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const serverURL = import.meta.env.VITE_API_ENDPOINT;

console.log('serverUrl', serverURL);

export const institutionApi = createApi({
  reducerPath: 'institutionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/` }),
  endpoints: (builder) => ({
    registerInstitution: builder.mutation<Institution, Partial<Institution>>({
      query: (institution) => ({
        url: '/api/institutions/register',
        method: 'POST',
        body: institution,
      }),
    }),
    loginInstitution: builder.mutation<
      { token: string; institution: Institution },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterInstitutionMutation, useLoginInstitutionMutation } = institutionApi;
