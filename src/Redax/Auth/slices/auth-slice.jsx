import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../operation/Operation";

const initialState = {
  accessTokenn: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  errors: null,
  operationType: null,
  modal: false,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.operationType = action.meta.arg.operationType;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.operationType = action.meta.arg.operationType;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.accessTokenn = action.payload.data.access_token;
        state.refreshToken = action.payload.data.access_token;
      });
  }
});

export const { toggleModal } = authSlice.actions;
export default authSlice.reducer;