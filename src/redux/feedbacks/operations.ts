import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import axiosInstance from '../../axios/settings'
import { Review } from './slice'

type User = {
  id: number
}
export const getUserByID = createAsyncThunk<User, number>(
  '/api/users/return_user',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put('api/users/return_user', id)
      return response.data.name
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

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
      const reviews: Review[] = response.data
      const handledReviews = await Promise.all(
        reviews.map(async (review) => {
          const userResponse = await thunkAPI.dispatch(
            getUserByID(review.user_id)
          )
          return { ...review, user_name: userResponse }
        })
      )
      return handledReviews
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const submitReview = createAsyncThunk(
  'api/reviews/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/reviews/create', formData)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      return rejectWithValue(axiosError?.response?.status)
    }
  }
)
