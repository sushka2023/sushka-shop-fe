import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories, fetchAllItems } from "../operation/Operation";

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
    default:
      state.items = data;
      break;
  }
};

export const itemsSlice = createSlice({
  name: "AllItems",
  initialState: {
    items: [],
    isLoading: false,
    operation: null,
    offset: 0,
    sortValue: "low_price",
    selectedWeight: '',
    error: null,
    allCategories: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.is_favorite = !action.payload.is_favorite;
        }
      });
    },
    setOffset: (state, action) => {
      state.offset = action.payload || 0;
    },
    setOperation: (state, action) => {
      state.operation = action.payload;
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },
    setSelectedWeight: (state, action) => {
      state.selectedWeight = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItems.pending, handlePending)
      .addCase(fetchAllItems.rejected, handleRejected)
      .addCase(fetchAllItems.fulfilled, handleFulfilledOperationItems)
      .addCase(fetchAllCategories.pending, handlePending)
      .addCase(fetchAllCategories.rejected, handleRejected)
      .addCase(fetchAllCategories.fulfilled, handleFulfilled);
  },
});

export const { toggleFavorite, setOffset, setOperation, setSortValue, setSelectedWeight } = itemsSlice.actions;
export default itemsSlice.reducer;
