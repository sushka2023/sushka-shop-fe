import { createSlice } from '@reduxjs/toolkit'
import { fetchBasketItemsThunk } from './operations'

const initialState: { basketItemCount: number } = {
  basketItemCount: 0
}

export const basketItemCountSlice = createSlice({
  name: 'basketItemCount',
  initialState,
  reducers: {
    updateCount(state, action) {
      state.basketItemCount = action.payload.length
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasketItemsThunk.fulfilled, (state, { payload }) => {
      state.basketItemCount = payload.length
    })
  }
})

export const { updateCount } = basketItemCountSlice.actions
export default basketItemCountSlice.reducer
