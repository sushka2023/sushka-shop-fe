import { createSlice } from '@reduxjs/toolkit'
import { UserResponse } from '../../types'
import { currentUser, login, logout, signUp } from './operation'

export type OperationType = 'Login' | 'SignUp' | 'currentUser'

export type SignUpFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

type AuthState = {
  user: UserResponse | null
  isLoggedIn: boolean
  isLoading: boolean
  errors: any | null
  operationType: OperationType | null
}

const INITIAL_STATE: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  errors: null,
  operationType: null
}

export const authSlice = createSlice({
  name: 'Auth',
  initialState: INITIAL_STATE,
  reducers: {},
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
        state.isLoggedIn = true
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
        state.isLoggedIn = true
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
        state.user = null
        state.isLoggedIn = false
        state.isLoading = false
        state.errors = null
        state.operationType = null
      })
  }
})

export default authSlice.reducer
