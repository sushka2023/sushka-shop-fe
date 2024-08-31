import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceResponse } from '../../../types'

type PriceEditResponse = Pick<PriceResponse, 'id' | 'is_active' | 'quantity'>

type InitialStateType = {
  products: PriceEditResponse[]
  status: string
}

const initialState: InitialStateType = {
  products: [],
  status: ''
}

export const pricesSlice = createSlice({
  name: 'editProduct',
  initialState,
  reducers: {
    setProductData(state, action: PayloadAction<PriceEditResponse[]>) {
      state.products = action.payload
    },
    updateProductData(state, action: PayloadAction<PriceEditResponse>) {
      const { id, is_active, quantity } = action.payload

      if (!state.products) {
        state.products = []
      }

      const index = state.products.findIndex((p) => p.id === id)
      if (index !== -1) {
        state.products[index] = { id, is_active, quantity }
      } else {
        state.products.push(action.payload)
      }
    },
    clearProductData(state) {
      state.products = []
    },
    setProductStatus(state, action: PayloadAction<string>) {
      state.status = action.payload
    }
  }
})

export const {
  setProductData,
  updateProductData,
  clearProductData,
  setProductStatus
} = pricesSlice.actions
export default pricesSlice.reducer
