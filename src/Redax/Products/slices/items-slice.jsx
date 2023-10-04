import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "../operation/Operation";
import { addToFavorite } from "./favoriteSlice";

const handleRejected = (state, action) => {
  state.operation = null;
  state.isLoading = false;
  state.error = action.payload;
};

const toggleItemInFavorite = (favorite, itemToAddOrRemove) => {
  const existingIndex = favorite.findIndex(
    (item) => item.product.id === itemToAddOrRemove.product.id
  );

  if (existingIndex === -1) {
    return [...favorite, itemToAddOrRemove];
  }

  else {
    return favorite.filter((item) => item.product.id !== itemToAddOrRemove.product.id);
  }
}

export const itemsSlice = createSlice({
  name: "AllItems",
  initialState: {
    items: [],
    favorite: [],
    isLoading: false,
    operation: null,
    error: null,
    operationType: null,
  },
  extraReducers: {
    [fetchItems.pending](state, action) {
      state.isLoading = true;
      state.operation = action.meta.arg.operationType;
    },
    [fetchItems.rejected]: handleRejected,
    [fetchItems.fulfilled](state, action) {
      state.operation = null;
      state.isLoading = false;
      state.error = null;
      if (action.payload.operationType === "pagination") {
        state.items = action.payload.data;
      }
      if (action.payload.operationType === "loadMore") {
        state.items = [...state.items, ...action.payload.data];
      }

      if (action.payload.operationType === "fatch") {
        state.items = action.payload.data;
      }
    },
    [addToFavorite](state, action) {
      const updatedFavorite = toggleItemInFavorite(state.favorite, action.payload);
      state.favorite = updatedFavorite;
    },
  },
});

export default itemsSlice.reducer;
