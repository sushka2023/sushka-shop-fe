import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Report } from 'notiflix/build/notiflix-report-aio'
import {
  Body_create_image_api_images_create_img_product_post,
  ImageResponse,
  PriceModel,
  PriceResponse,
  ProductCategoryResponse,
  ProductResponse,
  ProductSubCategoryResponse
} from '../../types'

export type MainCategoriesOperationType = 'fetch-main-categories'

type MainCategoriesParams = {
  operationType: MainCategoriesOperationType
}

export type MainCategoriesResponse = {
  data: ProductCategoryResponse[]
  operationType: MainCategoriesOperationType
}

export const fetchMainCategories = createAsyncThunk<
  MainCategoriesResponse,
  MainCategoriesParams
>('api/crm-main-categories', async ({ operationType }, thunkAPI) => {
  try {
    const response = await axios.get('api/product_category/all')
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY'

export type CategoriesOperationType = 'fetch-sub-categories'

type CategoriesParams = {
  operationType: CategoriesOperationType
}

export type CategoriesResponse = {
  data: ProductSubCategoryResponse[]
  operationType: CategoriesOperationType
}

export const fetchSubCategories = createAsyncThunk<
  CategoriesResponse,
  CategoriesParams
>('api/crm-sub-categories', async ({ operationType }, thunkAPI) => {
  try {
    const response = await axios.get('api/product_sub_category/all_for_crm', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

export type CreateProductParams = Pick<
  ProductResponse,
  'name' | 'description' | 'product_status' | 'sub_categories'
> & { main_category: number }

export const createNewProduct = createAsyncThunk<string, CreateProductParams>(
  'api/create-product',
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(
        'api/product/create',
        {
          name: product.name,
          description: product.description,
          product_category_id: product.main_category,
          sub_categories_id: product.sub_categories,
          product_status: product.product_status,
          promotional: true,
          new_product: true,
          is_popular: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data.id
    } catch (e) {
      const error = e as AxiosError
      Report.failure('Упс... сталася помилка', `${error.message}`, 'Добре')

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const addImages = createAsyncThunk<
  ImageResponse,
  Body_create_image_api_images_create_img_product_post
>('api/create-images', async (imageFile, thunkAPI) => {
  try {
    const response = await axios.post(
      'api/images/create_img_product',
      imageFile,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (e) {
    const error = e as AxiosError

    Report.failure(
      'Помилка під час завантаження файлів',
      'Заплатіть своїм розробникам',
      'Добре'
    )
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
  }
})

export type Price = Pick<PriceModel, 'weight' | 'price'> & {
  availability: number
  active: boolean
  sale: boolean
  priceSale: number
}

type AddPriceParams = {
  price: Price
  productId: string
}

export const addPrice = createAsyncThunk<PriceResponse, AddPriceParams>(
  'api/create-price',
  async ({ price, productId }, thunkAPI) => {
    try {
      const response = await axios.post(
        'api/price/create',
        {
          product_id: productId,
          weight: price.weight,
          price: price.price,
          old_price: price.priceSale,
          quantity: price.availability,
          is_active: price.active,
          promotional: price.sale
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
