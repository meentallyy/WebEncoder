import { configureStore } from '@reduxjs/toolkit';
import encoderReducer from './slices/encoderSlice.ts';
import filtersReduser from "./slices/filtersSlice.ts"
import { RootState } from './types.ts';

export const store = configureStore({
  reducer: {
    encoder: encoderReducer,
    filters: filtersReduser,
  },
});
export type {RootState};
export type AppDispatch = typeof store.dispatch;