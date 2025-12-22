import { configureStore } from '@reduxjs/toolkit';
import encoderReducer from './slices/encoderSlice.ts';
import filtersReduser from "./slices/filtersSlice.ts";
import profileReduser from "./slices/profileReduser.ts";
import { RootState } from './types.ts';


export const store = configureStore({
  reducer: {
    encoder: encoderReducer,
    filters: filtersReduser,
    profile: profileReduser,
  },
});
export type {RootState};
export type AppDispatch = typeof store.dispatch;