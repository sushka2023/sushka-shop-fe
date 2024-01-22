export const selectIsLoading = (state) => {
  return state.items.isLoading
}

export const selectAllItem = (state) => {
  return state.items.items
}

export const selectFavoriteItem = (state) => {
  return state.items.favorite
}

export const selectAllCategories = (state) => {
  return state.items.allCategories
}
