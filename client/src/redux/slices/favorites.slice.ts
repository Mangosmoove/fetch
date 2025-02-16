import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DogIdsState {
    ids: string[];
}

const initialState: DogIdsState = {
    ids: []
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const dogId = action.payload;

            if (state.ids.includes(dogId)) {
                // If the dogId is already in the list, remove it
                state.ids = state.ids.filter(id => id !== dogId);
            } else {
                // If the dogId is not in the list, add it
                state.ids.push(dogId);
            }
        }
    }
})

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
