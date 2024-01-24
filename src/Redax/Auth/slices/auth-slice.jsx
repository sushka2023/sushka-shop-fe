import { createSlice } from '@reduxjs/toolkit'
import { login, currentUser, signUp, logout } from '../operation/Operation'

const INITIAL_STATE = {
  accessTokenn: null,
  user: null,
  isLogedIn: false,
  isLoading: false,
  errors: null,
  operationType: null,
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.payload
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        if (state.errors) {
          state.errors = null
        }
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
        state.accessTokenn = action.payload.data.access_token
        state.isLogedIn = true
        if (state.errors) {
          state.errors = null
        }
      })
      .addCase(currentUser.pending, (state, action) => {
        state.isLoading = true
        state.operationType = action.meta.arg.operationType
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLogedIn = true
        state.user = action.payload.data
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessTokenn = null
        state.user = null
        state.isLogedIn = false
        state.isLoading = false
        state.errors = null
        state.operationType = null
        state.modal = false
      })
  }
})

export default authSlice.reducer
