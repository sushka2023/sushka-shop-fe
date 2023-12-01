import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationApi from '../operation/Operation';

const accessToken = localStorage.getItem('access_token')
? localStorage.getItem('access_token')
: null

export const fetchLoging = createAsyncThunk('auth/fetchLoging', async (values, { rejectWithValue }) => {
    try {
        const result = await applicationApi.login(values)
        localStorage.setItem('access_token', result.access_token)
        return result;
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})

export const authReducer = createSlice({
    
    name: 'auth',
    initialState: {
      isLoading: false,
      error: '',
      isAuthentificated: false,
      accessToken: accessToken,
    },
    extraReducers: builder => {
      builder
        .addCase(fetchLoging.pending, (state, action) => {
          state.isLoading = true;
          state.isAuthentificated = false;
        })
        .addCase(fetchLoging.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isAuthentificated = true;
          state.accessToken = action.payload.access_token;
        })
        .addCase(fetchLoging.rejected, (state, action) => {
          state.isLoading = false;
          console.log(action)
          if (action.error) {
            state.error = action.error
          }
        })
    }
})
  
export default authReducer.reducer