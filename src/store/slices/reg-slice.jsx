import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationApi from '../../services/api';

export const fetchRegistration = createAsyncThunk('reg/fetchRegistration', async (values, { rejectWithValue }) => {
    console.log('alibaba')
    try {
        console.log(values)
        return await applicationApi.registration(values)
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})

export const regReducer = createSlice({
    
    name: 'reg',
    initialState: {
      isLoading: false,
      error: '',
      isRegistered: false,
    },
    extraReducers: builder => {
      builder
        .addCase(fetchRegistration.pending, (state, action) => {
          state.isLoading = true;
          state.isRegistered = false;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isRegistered = true;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
          state.isLoading = false;
          console.log(action)
          if (action.error) {
            state.error = action.error
          }
        })
    }
})
  
export default regReducer.reducer