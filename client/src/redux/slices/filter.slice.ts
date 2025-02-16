import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FilterState {
    selectedBreeds: string[];
    ageMin: string;
    ageMax: string;
    zipCode: string[];
    sort: string;
    sortDirection: string;
}

const initialState: FilterState = {
    selectedBreeds: [],
    ageMin: '',
    ageMax: '',
    zipCode: [],
    sort: "breed",
    sortDirection: "asc"
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
        },
        toggleSortDirection: (state) => {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
        }
    }
})

export const {setFilters, setSort, toggleSortDirection} = filterSlice.actions;
export default filterSlice.reducer;
