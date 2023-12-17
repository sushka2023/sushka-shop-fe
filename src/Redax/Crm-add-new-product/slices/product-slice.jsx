import { createSlice } from "@reduxjs/toolkit";
import { createNewProduct, addImages, addPrice } from "../operation/Operation";

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
    isLoading: null,
    operation: null,
    error: null,
    formErrors: {},
    imagesUploadCount: 0,
    images: false
  },
  reducers: {
    addData: (state, action) => {
      const key = action.payload.type;
      const values = action.payload.value;
      state[key] = values;

      if (key === "sub_categories" && values)
        state[key] = values.filter((value) => value);

      if (key === "main_category" && values)
        state[key] = values.find((category) => category);
    },
    setFormErrors: (state, action) => {
      state.formErrors = action.payload;
    },
    incrementImagesUploadCount: (state) => {
      state.imagesUploadCount += 1;
    },
    resetImagesUploadCount: (state) => {
      state.imagesUploadCount = 0;
    },
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
        state.product_status = "new";
        state.main_category = null;
        state.sub_categories = [];
        state.isLoading = null;
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
      })
      .addCase(addPrice.pending, (state) => {
        state.isLoading += 1;
      })
      .addCase(addPrice.rejected, (state) => {
        state.isLoading -= 1;
      })
      .addCase(addPrice.fulfilled, (state) => {
        state.isLoading -= 1;
      });
  },
});

export const { addData, addCategories, setFormErrors, incrementImagesUploadCount, resetImagesUploadCount } =
  productSlice.actions;
export default productSlice.reducer;
