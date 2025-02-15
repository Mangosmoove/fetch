import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Dog, LoginRequest} from "../utils/type.ts";

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
            query: (params: LoginRequest) => {
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
                return {
                    url: `api/dogs/search?${params.toString()}`,
                };
            },
        }),
        getDogDetails: build.query<Dog[], string[]>({
            query: (dogsIds) => ({
                url: `/api/dogs`,
                method: "POST",
                body: dogsIds
            })
        })
    }),
});
export const {
    useAuthenticateUserInfoMutation,
    useGetDogBreedsQuery,
    useSearchDogsQuery,
    useLazySearchDogsQuery,
    useGetDogDetailsQuery,
    useLazyGetDogDetailsQuery
} = api;
