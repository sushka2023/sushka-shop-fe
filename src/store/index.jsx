import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from './slices/items-slice';

export const store = configureStore({
    reducer: {
        items: itemsSlice,
    },
});
