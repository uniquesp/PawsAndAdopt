import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Breed, Category } from "../types/donate-pet-type";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/categories",
    }),
    getBreedsByCategory: builder.query<ApiResponse<Breed[]>, number>({
      query: (categoryId) => `/breeds?category_id=${categoryId}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetBreedsByCategoryQuery } = categoryApi;
