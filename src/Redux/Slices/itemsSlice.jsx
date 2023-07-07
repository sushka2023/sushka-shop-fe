import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "AllItems",
  initialState: [],
});

export default itemsSlice.reducer;
