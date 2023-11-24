import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "newProduct",
  initialState: {
    name: null,
    description: null,
    product_status: "new",
    main_category: null,
    sub_categories: [],
    images: [],
    price: [],
    isLoading: false,
    operation: null,
    error: null,
  },
  reducers: {
    addData: (state, action) => {
      const key = action.payload.type;
      const values = action.payload.value;
      state[key] = values;
      if (Array.isArray(values)) {
        state[key] = values.filter((value) => value);
      }
      if (key === "main_category" && values) {
        state[key] = values.find((category) => category);
      }
    }
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(addData.pending, handlePending)
  //       .addCase(addData.rejected, handleRejected)
  //       .addCase(addData.fulfilled, handleFulfilled)
  //   },
});

export const { addData, addCategories, addPrice } = productSlice.actions;
export default productSlice.reducer;
