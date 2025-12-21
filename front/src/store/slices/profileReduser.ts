import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { CATEGORIES, Category, FilterState, ProfileState, TIME_RANGES, User } from "../types.ts";
import { ALGORITHMS } from "../../config/algorithms.ts";

const initialState:ProfileState = {
    user:{
            name:"",
            email:"",
            phone:"",
            dateRegistration: "12.12.2004",
            hasPro:false,
    }
};

const profileSlise = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser:(state,action: PayloadAction<User>) => {
            state.user = action.payload;
        },

    }
})

export const {
    setUser,
} = profileSlise.actions;

export default profileSlise.reducer;