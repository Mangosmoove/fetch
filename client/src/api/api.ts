import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: "include",
    prepareHeaders: (headers: Headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    authenticateUserInfo: build.mutation({
      query: (params) => {
        const url = "/api/auth/login";
        return {
          url,
          method: "POST",
          body: {
            name: params.name,
            email: params.email,
          },
        };
      },
    }),
    getDogBreeds: build.query<string[], void>({
      query: () => {
        const url = "/api/dogs/breeds";
        return {
          url,
        };
      },
    }),
  }),
});
export const { useAuthenticateUserInfoMutation, useGetDogBreedsQuery } = api;
