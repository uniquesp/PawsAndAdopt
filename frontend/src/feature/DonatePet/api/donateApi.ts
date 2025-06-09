// donationApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, CreateDonationResponse, CreatePetResponse, Donation} from "../types/donate-pet-type";

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/donate_pets",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPet: builder.mutation<ApiResponse<CreatePetResponse>, FormData>({
      query: (formData) => ({
        url: "/create_pet",
        method: "POST",
        body: formData,
        // Don't set Content-Type header, let the browser set it with the boundary parameter
        formData: true,
      }),
    }),
    createDonation: builder.mutation<ApiResponse<CreateDonationResponse>, { pet_id: number; donate_pet: Donation }>({
      query: (donationData) => ({
        url: "/create_donation",
        method: "POST",
        body: donationData,
      }),
    }),
  }),
});

export const { useCreatePetMutation, useCreateDonationMutation } = donationApi;