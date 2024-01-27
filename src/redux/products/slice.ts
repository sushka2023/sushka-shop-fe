import { createSlice } from '@reduxjs/toolkit'
import {
  FetchAllCategoriesOperationType,
  FetchItemOperationType,
  fetchAllCategories,
  fetchItems
} from './operation'
import { ProductCategoryResponse, ProductResponse } from '../../types'

export type ItemsState = {
  items: ProductResponse[]
  isLoading: boolean
  operation: FetchItemOperationType | FetchAllCategoriesOperationType | null
  error: any | null
  allCategories: ProductCategoryResponse[] | null
}

const INITIAL_STATE: ItemsState = {
  items: [],
  isLoading: false,
  operation: null,
  error: null,
  allCategories: null
}

export const itemsSlice = createSlice({
  name: 'AllItems',
  initialState: INITIAL_STATE,
  reducers: {
    toggleFavorite: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.is_favorite = !action.payload.is_favorite
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = true
        state.operation = action.meta.arg.operationType
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = action.payload
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = null

        switch (action.payload.operationType) {
          case 'loadMore':
            state.items = [...state.items, ...action.payload.data]
            break
          case 'fetch':
            state.items = action.payload.data
            break
          default:
            break
        }
      })
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.isLoading = true
        state.operation = action.meta.arg.operationType
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = action.payload
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = null
        state.allCategories = action.payload.data
      })
  }
})

export const { toggleFavorite } = itemsSlice.actions
export default itemsSlice.reducer
