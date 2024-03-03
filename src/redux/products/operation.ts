import { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  FavoriteItemsModel,
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
  category: string | null | undefined
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

export const addToFavorite = createAsyncThunk(
  'api/favorite',
  async ({ product_id }: FavoriteItemsModel, thunkAPI) => {
    try {
      const response = await axiosInstance.post('api/favorite_items/add', {
        product_id
      })
      return { data: response.data }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const removeFavorite = createAsyncThunk(
  'api/remove_favorite',
  async ({ product_id }: FavoriteItemsModel, thunkAPI) => {
    try {
      await axiosInstance.delete('api/favorite_items/remove', {
        data: {
          product_id: product_id
        }
      })
      return { data: product_id }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const fetchFavoriteItems = createAsyncThunk(
  'api/get_favorite',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('api/favorite_items/')
      return { data: response.data }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export type { FetchItemOperationType, FetchAllCategoriesOperationType }
