import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInRequest, SignInResponse } from '../types/signin-type';
import { BASE_URL_RAILS_API } from '@/config';


export const signInApi = createApi({
  reducerPath: 'signInApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_RAILS_API,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInUserMutation } = signInApi;

