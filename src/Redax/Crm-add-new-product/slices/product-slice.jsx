import { createSlice } from "@reduxjs/toolkit";
import { createNewProduct } from "../operation/Operation";

export const productSlice = createSlice({
  name: "newProduct",
  initialState: {
    productId: null,
    name: null,
    description: null,
    product_status: "new",
    main_category: null,
    sub_categories: [],
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

      if (key === "sub_categories" && values) state[key] = values.filter((value) => value);
      
      if (key === "main_category" && values) state[key] = values.find((category) => category);
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
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operation = null;
        state.error = null;
        state.productId = action.payload;
      })
  },
});

export const { addData, addCategories, addPrice } = productSlice.actions;
export default productSlice.reducer;
