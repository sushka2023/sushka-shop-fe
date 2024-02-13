import { createSlice } from '@reduxjs/toolkit'
import {
  FetchAllCategoriesOperationType,
  FetchItemOperationType,
  fetchAllCategories,
  fetchItems
} from './operation'
import { ProductCategoryResponse, ProductResponse } from '../../types'

enum SortValue {
  lowPrice = 'low_price',
  highPrice = 'high_price'
}

export type ItemsState = {
  items: ProductResponse[]
  isLoading: boolean
  operation: FetchItemOperationType | FetchAllCategoriesOperationType | null
  error: any | null
  totalCount: number
  allCategories: ProductCategoryResponse[] | null
  offset: number
  sortValue: string
  selectedWeight: string[]
  isFavorite: []
}

const INITIAL_STATE: ItemsState = {
  items: [],
  isLoading: false,
  operation: null,
  error: null,
  totalCount: 0,
  allCategories: null,
  offset: 0,
  sortValue: SortValue.lowPrice,
  selectedWeight: [],
  isFavorite: []
}

export const itemsSlice = createSlice({
  name: 'AllItems',
  initialState: INITIAL_STATE,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload || 0
    },
    setOperation: (state, action) => {
      state.operation = action.payload
    },
    setSortValue: (state, action) => {
      state.sortValue = action.payload
    },
    setSelectedWeight: (state, action) => {
      if (!state.selectedWeight.includes(action.payload)) {
        state.selectedWeight = [...state.selectedWeight, action.payload]
      } else {
        state.selectedWeight = state.selectedWeight.filter(
          (weight) => weight !== action.payload
        )
      }
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
        state.error = null
        state.totalCount = action.payload.totalCount
        state.operation = action.payload.operationType

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

export const {
  toggleFavorite,
  setOffset,
  setOperation,
  setSortValue,
  setSelectedWeight
} = itemsSlice.actions
export default itemsSlice.reducer
