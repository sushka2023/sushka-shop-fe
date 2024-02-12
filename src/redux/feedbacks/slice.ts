import { createSlice } from '@reduxjs/toolkit';
import { fetchReviews } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
}

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [fetchReviews.pending]: handlePending,
    [fetchReviews.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchReviews.rejected]: handleRejected,
  },
})


export const reviewsReducer = reviewsSlice.reducer;
