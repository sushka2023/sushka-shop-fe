/* eslint-disable complexity */
import { createSlice } from '@reduxjs/toolkit'
import {
  Price,
  addImages,
  addPrice,
  createNewProduct,
  fetchProductsForCrm
} from '../operation'
import { ProductResponse, ProductSubCategoryResponse } from '../../../types'

export type ProductState = {
  productId: string | null
  name: string | null
  description: string | null
  product_status: string
  main_category: string | null
  sub_categories: ProductSubCategoryResponse[]
  price: Price[]
  isLoading: number | null
  isLoadingForCrm: boolean
  productsForCrm: ProductResponse[]
  productsForCrmPageNumber: number
  productsForCrmTotalCount: number
  operation: string | null
  error: unknown | null
  formErrors: Record<string, string>
  imagesUploadCount: number
  images: boolean
}

const INITIAL_STATE: ProductState = {
  productId: null,
  name: null,
  description: null,
  product_status: 'new',
  main_category: null,
  sub_categories: [],
  price: [],
  isLoading: null,
  isLoadingForCrm: false,
  productsForCrm: [],
  productsForCrmPageNumber: 0,
  productsForCrmTotalCount: 0,
  operation: null,
  error: null,
  formErrors: {},
  imagesUploadCount: 0,
  images: false
}

export type AddDataAction = {
  payload:
    | { type: 'price'; value: Price[] }
    | { type: 'isLoading'; value: any }
    | { type: 'images'; value: boolean }
    | { type: 'main_category'; value: any }
    | { type: 'sub_categories'; value: any }
  type: string
}

export const productSlice = createSlice({
  name: 'newProduct',
  initialState: INITIAL_STATE,
  reducers: {
    addData: (state, action: AddDataAction) => {
      const { type, value } = action.payload

      switch (type) {
        case 'isLoading':
          state.isLoading = value
          state.productId = null
          break
        case 'sub_categories':
          state[type] =
            value &&
            value.filter((value: any) => {
              return value
            })
          break
        case 'main_category':
          state[type!] =
            value &&
            value.find((category: any) => {
              return category
            })
          break
        case 'price':
          state[type] = value
          break
        default:
          state[type] = value
          break
      }
    },
    setFormErrors: (
      state,
      action: {
        payload: Record<string, string>
        type: string
      }
    ) => {
      state.formErrors = action.payload
    },
    incrementImagesUploadCount: (state) => {
      state.imagesUploadCount += 1
    },
    resetImagesUploadCount: (state) => {
      state.imagesUploadCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading += 1
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        if (state.isLoading !== null) {
          state.isLoading -= 1
        }
        state.operation = null
        state.error = action.payload
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.name = null
        state.description = null
        state.product_status = 'new'
        state.main_category = null
        state.sub_categories = []
        state.isLoading = null
        state.operation = null
        state.error = null
        state.productId = action.payload
      })
      .addCase(addImages.pending, (state) => {
        state.isLoading += 1
      })
      .addCase(addImages.rejected, (state) => {
        state.isLoading -= 1
      })
      .addCase(addImages.fulfilled, (state) => {
        state.isLoading -= 1
      })
      .addCase(addPrice.pending, (state) => {
        state.isLoading += 1
      })
      .addCase(addPrice.rejected, (state) => {
        state.isLoading -= 1
      })
      .addCase(addPrice.fulfilled, (state) => {
        state.isLoading -= 1
      })
      .addCase(fetchProductsForCrm.pending, (state) => {
        state.isLoadingForCrm = true
      })
      .addCase(fetchProductsForCrm.rejected, (state, action) => {
        state.isLoadingForCrm = false
        state.productsForCrm = []
        state.error = action.payload
        state.productsForCrmTotalCount = 0
        state.productsForCrmPageNumber = 0
      })
      .addCase(fetchProductsForCrm.fulfilled, (state, action) => {
        state.isLoadingForCrm = false
        state.error = null
        state.productsForCrm = action.payload.products
        state.productsForCrmTotalCount = action.payload.totalCount
        state.productsForCrmPageNumber = action.payload.pageNumber
      })
  }
})

export const {
  addData,
  setFormErrors,
  incrementImagesUploadCount,
  resetImagesUploadCount
} = productSlice.actions
export default productSlice.reducer
