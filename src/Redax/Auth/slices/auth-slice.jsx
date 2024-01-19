import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../operation/Operation";

const initialState = {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.operationType = action.meta.arg.operationType;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
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
        state.user = action.payload.data;
      });
  }
});

export const { toggleModal } = authSlice.actions;
export default authSlice.reducer;