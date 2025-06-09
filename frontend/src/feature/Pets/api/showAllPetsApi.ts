import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PetsResponse } from '../types/pet-type';
import { BASE_URL_RAILS_API } from '@/config';

export const showAllPetsApi = createApi({
  reducerPath: 'showAllPetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_RAILS_API }),
  endpoints: (builder) => ({
    getAllPets: builder.query<PetsResponse, void>({
      query: () => '/pets',
      transformResponse: (response: PetsResponse) => {
        if (response.success) {
          return response;
        } else {
          throw new Error(response.message || 'Failed to fetch pets');
        }
      },
    }),
  }),
});

export const { useGetAllPetsQuery } = showAllPetsApi;
