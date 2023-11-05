import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationApi from '../../services/api';

export const fetchUser = createAsyncThunk('user/fetchUser', async (values, { rejectWithValue }) => {
    try {
        const result = await applicationApi.getCurrentUser()
        return result;
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})

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