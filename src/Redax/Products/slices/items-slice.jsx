import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories, fetchItems } from "../operation/Operation";

const handlePending = (state, action) => {
  state.isLoading = true;
  state.operation = action.meta.arg.operationType;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.operation = null;
  state.error = action.payload;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.operation = null;
  state.error = null;
  state.allCategories = action.payload.data;
}

const handleFulfilledOperationItems = (state, action) => {
  state.isLoading = false;
  state.operation = null;
  state.error = null;

  const { data } = action.payload;

  switch (action.payload.operationType) {
    case "loadMore":
      state.items = [...state.items, ...data];
      break;
    case "fatch":
      state.items = data;
      break;
    default:
      break;
  }
};

export const itemsSlice = createSlice({
  name: "AllItems",
  initialState: {
    items: [],
    isLoading: false,
    operation: null,
    error: null,
    allCategories: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      state.items.map((item) => {
        if (item.product.id === action.payload.product.id) {
          item.product.is_favorite = !action.payload.product.is_favorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, handlePending)
      .addCase(fetchItems.rejected, handleRejected)
      .addCase(fetchItems.fulfilled, handleFulfilledOperationItems)
      .addCase(fetchAllCategories.pending, handlePending)
      .addCase(fetchAllCategories.rejected, handleRejected)
      .addCase(fetchAllCategories.fulfilled, handleFulfilled);
  },
});

export const { toggleFavorite } = itemsSlice.actions;
export default itemsSlice.reducer;
