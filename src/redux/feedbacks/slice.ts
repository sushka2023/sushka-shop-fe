import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchReviews, submitReview } from './operations'

export interface Images {
  id: number
  product_id: number
  review_id: number
  image_url: string
  description: string
  image_type: string
}

export type Review = {
  id: number
  user_id: number
  product_id: number
  rating: number
  description: string
  created_at: string
  is_deleted: boolean
  is_checked: boolean
  images: Images[]
  user: {
    email: string
    first_name: string
    id: number
    last_name: string
    role: string
    is_active: boolean
  }
}

type ReviewsState = {
  items: Review[]
  isLoading: boolean
  error: string | null
}

const handlePending = (state: ReviewsState) => {
  state.isLoading = true
}

const handleRejected = (state: ReviewsState, action: PayloadAction<string>) => {
  state.isLoading = false
  state.error = action.payload
}

const initialState: ReviewsState = {
  items: [],
  isLoading: false,
  error: null
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [fetchReviews.pending]: handlePending,
    [fetchReviews.fulfilled](state, action) {
      state.isLoading = false
      state.error = null
      state.items = action.payload
    },
    [fetchReviews.rejected]: handleRejected,
    [submitReview.pending]: handlePending,
    [submitReview.fulfilled](state, { payload }) {
      state.isLoading = false
      state.error = null
      state.items.push(payload)
    },
    [submitReview.rejected]: handleRejected
  }
})

export const reviewsReducer = reviewsSlice.reducer
