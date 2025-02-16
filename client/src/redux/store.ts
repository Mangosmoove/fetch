import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";

import {api} from "../api/api";
import {filterSlice} from "./slices/filter.slice.ts";
import {favoritesSlice} from "./slices/favorites.slice.ts";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    filter: filterSlice.reducer,
    favorites: favoritesSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
