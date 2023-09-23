import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "../Products/slices/items-slice";

export const store = configureStore({
  reducer: {
    items: itemsSlice,
  },
});
