import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "../Slices/itemsSlice";

export const store = configureStore({
    reducer: {
      items: itemsSlice
    },
});
