import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios/settings'
import { BasketItemsResponse } from '../../types'
import { AxiosError } from 'axios'

const getBasketItems = async () => {
  const { data } =
    await axiosInstance.get<BasketItemsResponse[]>(`api/basket_items/`)

  return data
}

export const fetchBasketItemsThunk = createAsyncThunk(
  `basketCount/fetchBasketItems`,
  async (_, thunkAPI) => {
    try {
      return await getBasketItems()
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
