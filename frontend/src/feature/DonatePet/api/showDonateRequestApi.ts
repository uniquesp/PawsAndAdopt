import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DonationResponse } from "../types/show-donation-request-type";


export const showDonateRequestApi = createApi({
  reducerPath: "viewDonateRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/donate_pets",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserDonations: builder.query<DonationResponse, void>({
      query: () => ({
        url: "/show_donations",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchUserDonationsQuery } = showDonateRequestApi;
