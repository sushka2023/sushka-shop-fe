import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationApi from '../operation/Operation';

export const fetchRegistration = createAsyncThunk('reg/fetchRegistration', async (values, { rejectWithValue }) => {
    try {
        console.log(values)
        return await applicationApi.registration(values)
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchConfirmEmail = createAsyncThunk('reg/fetchConfirmEmail', async (values, { rejectWithValue }) => {
  try {
      console.log(values)
      return await applicationApi.confirmedEmail(values)
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
      isConfirmed: false,
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
          if (action.error) {
            state.error = action.error
          }
        })
        .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
          state.isConfirmed = true;
        })
        .addCase(fetchConfirmEmail.rejected, (state, action) => {
          state.isConfirmed = false;
          if (action.error) {
            state.error = action.error
          }
        })
    }
})
  
export default regReducer.reducer