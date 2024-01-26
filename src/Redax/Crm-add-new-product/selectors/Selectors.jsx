export const selectMainCategories = (state) => {
  return state.allCategories.mainCategories
}

export const selectSubCategories = (state) => {
  return state.allCategories.subCategories
}

export const selectFormData = (state) => {
  return state.newProduct
}

export const selectProductId = (state) => {
  return state.newProduct.productId
}

export const selectFormErrors = (state) => {
  return state.newProduct.formErrors
}

export const selectIsLoading = (state) => {
  return state.newProduct.isLoading
}
