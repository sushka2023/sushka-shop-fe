import { createSlice } from "@reduxjs/toolkit";
import { createNewProduct, addImages } from "../operation/Operation";

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
    isLoading: 0,
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
        state.isLoading += 1;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading -= 1;
        state.operation = null;
        state.error = action.payload;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.name = null;
        state.description = null;
        state.main_category = null;
        state.sub_categories = [];
        state.price = [];
        state.isLoading -= 1;
        state.operation = null;
        state.error = null;
        state.productId = action.payload;
      })
      .addCase(addImages.pending, (state) => {
        state.isLoading += 1;
      })
      .addCase(addImages.rejected, (state) => {
        state.isLoading -= 1;
      })
      .addCase(addImages.fulfilled, (state) => {
        state.isLoading -= 1;
      });
  },
});

export const { addData, addCategories, addPrice } = productSlice.actions;
export default productSlice.reducer;
