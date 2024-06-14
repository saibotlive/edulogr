import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../config';

interface Institution {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export const institutionApi = createApi({
  reducerPath: 'institutionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/api/institutions` }),
  endpoints: (builder) => ({
    registerInstitution: builder.mutation<Institution, Partial<Institution>>({
      query: (institution) => ({
        url: '/register',
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
