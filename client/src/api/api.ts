import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  zipCodes, ageMin, ageMax, size = 25, from, sort
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
    searchDogs: build.query({
      query: () => {
        const params = new URLSearchParams();
        let breeds = ["Labrador", "Beagle"]; //testing

        if (breeds) {
          breeds.forEach((breed) => {
            params.append("breeds", breed); 
          });
        }

        return {
          url: `api/dogs/search?${params.toString()}`,
        };
      },
    }),
  }),
});
export const {
  useAuthenticateUserInfoMutation,
  useGetDogBreedsQuery,
  useLazySearchDogsQuery,
} = api;
