import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
      addToFavorite: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addToFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
