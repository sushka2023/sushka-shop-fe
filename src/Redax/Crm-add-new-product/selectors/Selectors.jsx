export const selectMainCategories = (state) => state.allCategories.mainCategories;

export const selectSubCategories = (state) => state.allCategories.subCategories;

export const selectFormData = (state) => state.newProduct;

export const selectProductId = (state) => state.newProduct.productId;

export const selectFormErrors = (state) => state.newProduct.formErrors;