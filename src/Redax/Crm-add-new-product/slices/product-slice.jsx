import { createSlice } from "@reduxjs/toolkit";
import { createNewProduct } from "../operation/Operation";

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
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.operation = null;
        state.error = action.payload;
      })
      .addCase(createNewProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.operation = null;
        state.error = null;
      })
  },
});

export const { addData, addCategories, addPrice } = productSlice.actions;
export default productSlice.reducer;
