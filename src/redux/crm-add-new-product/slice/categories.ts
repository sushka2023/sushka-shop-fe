import { createSlice } from '@reduxjs/toolkit'
import {
  CategoriesOperationType,
  MainCategoriesOperationType,
  fetchMainCategories,
  fetchSubCategories
} from '../operation'
import {
  ProductCategoryResponse,
  ProductSubCategoryResponse
} from '../../../types'

type CategoriesState = {
  mainCategories: ProductCategoryResponse[] | null
  subCategories: ProductSubCategoryResponse[] | null
  isLoading: boolean
  operation: MainCategoriesOperationType | CategoriesOperationType | null
  error: any
}

const INITIAL_STATE: CategoriesState = {
  mainCategories: null,
  subCategories: null,
  isLoading: false,
  operation: null,
  error: null
}

export const categoriesSlice = createSlice({
  name: 'allCategories',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCategories.pending, (state, action) => {
        state.isLoading = true
        state.operation = action.meta.arg.operationType
      })
      .addCase(fetchMainCategories.rejected, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = action.payload
      })
      .addCase(fetchMainCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = null
        state.mainCategories = action.payload.data
      })
      .addCase(fetchSubCategories.pending, (state, action) => {
        state.isLoading = true
        state.operation = action.meta.arg.operationType
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = action.payload
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.operation = null
        state.error = null
        state.subCategories = action.payload.data
      })
  }
})

export default categoriesSlice.reducer
