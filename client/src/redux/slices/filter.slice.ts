import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterState {
    selectedBreeds: string[];
    ageMin: string;
    ageMax: string;
    zipCode: string[];
    sort: string;
}

const initialState: FilterState = {
    selectedBreeds: [],
    ageMin: '',
    ageMax: '',
    zipCode: [],
    sort: "breed:asc"
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
            return { ...state, ...action.payload };
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        }
    }
})

export const {setFilters, setSort} = filterSlice.actions;
export default filterSlice.reducer;
