import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductCategoryResponse, ProductResponse } from '../../types'

axios.defaults.baseURL = 'https://www.test-store.shop/'

type FetchItemOperationType = 'loadMore' | 'fetch'

type FetchItemsResponse = {
  data: ProductResponse[]
  operationType: FetchItemOperationType
}

type FetchItemsParams = {
  params: number
  operationType: FetchItemOperationType
}

export const fetchItems = createAsyncThunk<
  FetchItemsResponse,
  FetchItemsParams
>('api/product', async ({ params, operationType }, thunkAPI) => {
  try {
    const response = await axios.get(
      `api/product/all?limit=9&offset=${params}&sort=name`
    )
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

type FetchAllCategoriesOperationType = 'fetchAllCategories'

type FetchAllCategoriesResponse = {
  data: ProductCategoryResponse
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
    const response = await axios.get('api/product_category/all')
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

export type { FetchItemOperationType, FetchAllCategoriesOperationType }
