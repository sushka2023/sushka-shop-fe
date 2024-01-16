import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { name: null, email: null },
  isLoading: false,
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
});

export const { toggleModal } = authSlice.actions;
export default authSlice.reducer;