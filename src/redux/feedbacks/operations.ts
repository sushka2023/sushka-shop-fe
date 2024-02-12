import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://www.test-store.shop/api/';



export const fetchReviews = createAsyncThunk(
  'reviews/',
  async (limit, offset, thunkAPI) => {
    try {
      const response = await axios.get(`reviews/?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);