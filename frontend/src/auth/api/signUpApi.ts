import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpRequest, SignUpResponse } from '../types/signup-type';
import { BASE_URL_RAILS_API } from '@/config';


export const signUpApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_RAILS_API }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = signUpApi;
