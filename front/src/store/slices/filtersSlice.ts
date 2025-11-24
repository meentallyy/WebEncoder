import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CATEGORIES, Category, FilterState, TIME_RANGES } from "../types.ts";
import { ALGORITHMS } from "../../config/algorithms.ts";

const initialState:FilterState = {
    selectedCategory: CATEGORIES[0],
    selectedTimeRange: TIME_RANGES[0],
    selectedAlgorithm: ALGORITHMS[0],
};

const filtersSlise = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterCategory:(state,action: PayloadAction<typeof CATEGORIES[number]>) => {
            state.selectedCategory = action.payload;
        },

        setFilterTimeRange:(state, action: PayloadAction<typeof TIME_RANGES[number]>) => {
            state.selectedTimeRange = action.payload
        },

        setFilterAlgorithm:(state, action: PayloadAction<typeof ALGORITHMS[number]>) => {
            state.selectedAlgorithm = action.payload
        },
    }
})

export const {
    setFilterTimeRange,
    setFilterCategory,
    setFilterAlgorithm,
} = filtersSlise.actions;

export default filtersSlise.reducer;