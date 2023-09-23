import { createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "../operation/Operation";

const handleRejected = (state, action) => {
  state.operation = null;
  state.isLoading = false;
  state.error = action.payload;
};

export const itemsSlice = createSlice({
  name: "AllItems",
  initialState: {
    items: [],
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
  },
});

export default itemsSlice.reducer;
