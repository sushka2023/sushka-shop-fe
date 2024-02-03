import { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ProductCategoryResponse,
  ProductResponse,
  ProductWithTotalResponse
} from '../../types'
import axiosInstance from '../../axios/settings'

type FetchItemOperationType =
  | 'loadMore'
  | 'fetch'
  | FetchAllCategoriesOperationType
  | null

type FetchItemsResponse = {
  data: ProductResponse[]
  operationType: FetchItemOperationType
  totalCount: number
}

type FetchItemsParams = {
  offset: number
  sortValue: string
  operationType: FetchItemOperationType
  category: string | false | undefined
  weight: string
}

export const fetchItems = createAsyncThunk<
  FetchItemsResponse,
  FetchItemsParams
>(
  'api/product',
  async ({ offset, sortValue, operationType, category, weight }, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ProductWithTotalResponse>(
        `api/product/all?limit=9&offset=${offset}&sort=${sortValue}${category ? `&pr_category_id=${category}` : ''}${weight ? `&weight=${weight}` : ''}`
      )
      return {
        data: response.data.products,
        operationType,
        totalCount: response.data.total_count
      }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type FetchAllCategoriesOperationType = 'fetchAllCategories'

type FetchAllCategoriesResponse = {
  data: ProductCategoryResponse[]
  operationType: FetchAllCategoriesOperationType
}

type FetchAllCategoriesParams = {
  operationType: FetchAllCategoriesOperationType
}

export const fetchAllCategories = createAsyncThunk<
  FetchAllCategoriesResponse,
  FetchAllCategoriesParams
>('api/allCategories', async ({ operationType }, thunkAPI) => {
  try {
    const response = await axiosInstance.get('api/product_category/all')
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

export type { FetchItemOperationType, FetchAllCategoriesOperationType }
