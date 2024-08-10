import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import axiosInstance from '../../axios/settings'
import { Review } from './slice'

type FetchReviewsParams = {
  limit: number
  offset: number
}

export const fetchReviews = createAsyncThunk<Review[], FetchReviewsParams>(
  'api/reviews/',
  async ({ limit, offset }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/reviews/?limit=${limit}&offset=${offset}`
      )
      return response.data
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const submitReview = createAsyncThunk(
  'api/reviews/create',
  async (formData, { rejectWithValue }) => {
    console.log(formData)
    try {
      const response = await axiosInstance.post('api/reviews/create', formData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return rejectWithValue(axiosError?.response?.status)
    }
  }
)
