import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Dog, LoginRequest, SearchQueryParams} from "../utils/type.ts";

const base_url = import.meta.env.VITE_API_BASE_URL;
//  zipCodes, ageMin, ageMax, size = 25, from, sort
export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
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
        logoutUser: build.mutation({
            query: () => ({
                url: "api/auth/logout",
                method: "POST",
            }),
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
            query: ({breeds, zipCodes, ageMin, ageMax, size, from, sort}: SearchQueryParams) => {
                const params = new URLSearchParams();
                if (breeds) {
                    breeds.forEach((breed) => params.append("breeds", breed));
                }
                if (zipCodes) {
                    zipCodes.forEach((zipCode) => params.append("zipCodes", zipCode));
                }
                if (ageMin) {
                    params.append("ageMin", ageMin);
                }
                if (ageMax) {
                    params.append("ageMax", ageMax);
                }
                if (size) {
                    params.append("size", size.toString());
                }
                if (from) {
                    params.append("from", from.toString());
                }
                if (sort) {
                    params.append("sort", sort);
                }
                return {
                    url: `api/dogs/search?${params.toString()}`,
                };
            },
        }),
        getDogDetails: build.query<Dog[], string[]>({
            query: (dogsIds) => ({
                url: "/api/dogs",
                method: "POST",
                body: dogsIds
            })
        }),
        getDogMatch: build.query<{ match: string }, string[]>({
            query: (dogIds: string[]) => ({
                url: "/api/dogs/match",
                method: "POST",
                body: dogIds
            })
        })
    }),
});
export const {
    useAuthenticateUserInfoMutation,
    useLogoutUserMutation,
    useGetDogBreedsQuery,
    useSearchDogsQuery,
    useLazySearchDogsQuery,
    useGetDogDetailsQuery,
    useLazyGetDogDetailsQuery,
    useLazyGetDogMatchQuery
} = api;
