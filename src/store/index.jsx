import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './slices/items-slice';
import regReducer from './slices/reg-slice';

export const store = configureStore({
    reducer: {
        items: itemsSlice,
        reg: regReducer,
    },
});
