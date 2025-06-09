import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdoptionResponse } from "../types/show-adopt-request-type";
import { BASE_URL_RAILS_API_ADOPT_PETS } from "@/config";


export const showAdoptRequestApi = createApi({
  reducerPath: "viewAdoptRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_RAILS_API_ADOPT_PETS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUserAdoptions: builder.query<AdoptionResponse, void>({
      query: () => ({
        url: "/show_adoptions",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchUserAdoptionsQuery } = showAdoptRequestApi;
