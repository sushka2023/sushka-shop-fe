import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../operation/Operation';

export const userReducer = createSlice({
    
    name: 'user',
    initialState: {
      isLoading: false,
      error: '',
      user: null,
    },
    extraReducers: builder => {
      builder
        .addCase(fetchUser.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isLoading = false;
          if (action.error) {
            state.error = action.error
          }
        })
    }
})
  
export default userReducer.reducer