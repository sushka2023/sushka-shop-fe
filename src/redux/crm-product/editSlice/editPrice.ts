import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceResponse } from '../../../types'

type PriceEditResponse = Pick<PriceResponse, 'id' | 'is_active' | 'quantity'>

type InitialStateType = {
  products: PriceEditResponse[]
  status: string
  popular: boolean
}

const initialState: InitialStateType = {
  products: [],
  status: '',
  popular: false
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
    },
    setPopularData(state, action: PayloadAction<boolean>) {
      state.popular = action.payload
    }
  }
})

export const {
  setProductData,
  setPopularData,
  updateProductData,
  clearProductData,
  setProductStatus
} = pricesSlice.actions
export default pricesSlice.reducer
