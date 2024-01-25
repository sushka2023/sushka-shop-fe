export const selectModal = (state) => {
  return state.auth.modal
}

export const selectUser = (state) => {
  return state.auth.user
}

export const selectIsLoading = (state) => {
  return state.auth.isLoading
}

export const selectErrors = (state) => {
  return state.auth.errors
}

export const selectOperationType = (state) => {
  return state.auth.operationType
}

export const selectToken = (state) => {
  return state.auth.accessTokenn
}

export const selectIsLogedIn = (state) => {
  return state.auth.isLogedIn
}
