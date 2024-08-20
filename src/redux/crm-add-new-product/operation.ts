import { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios/settings'
import { Report } from 'notiflix/build/notiflix-report-aio'
import {
  Body_create_image_api_images_create_img_product_post,
  ImageResponse,
  PriceModel,
  PriceResponse,
  ProductCategoryResponse,
  ProductResponse,
  ProductStatus,
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
    const response = await axiosInstance.get('api/product_category/all_for_crm')
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

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
    const response = await axiosInstance.get(
      'api/product_sub_category/all_for_crm'
    )
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

type FetchProductsForCrmParams = {
  limit: number
  offset: number
  productStatus?: ProductStatus
  productCategoryId?: number
}

type SearchProductsForCrmParams = {
  limit: number
  offset: number
  searchQuery: string
}

type FetchProductsForCrmResponse = {
  products: ProductResponse[]
  totalCount: number
  pageNumber: number
}

type SearchProductsForCrmResponse = {
  products: ProductResponse[]
  totalCount: number
  pageNumber: number
}

export const fetchProductsForCrm = createAsyncThunk<
  FetchProductsForCrmResponse,
  FetchProductsForCrmParams
>(
  'api/product/all_for_crm',
  async ({ limit, offset, productStatus, productCategoryId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('api/product/all_for_crm', {
        params: {
          limit,
          offset,
          pr_status: productStatus,
          pr_category_id: productCategoryId
        }
      })

      return {
        products: response.data.products,
        totalCount: response.data.total_count,
        pageNumber: Math.floor(offset / limit)
      }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export const searchProductsForCrm = createAsyncThunk<
  SearchProductsForCrmResponse,
  SearchProductsForCrmParams
>(
  'api/product/search_for_crm/',
  async ({ limit, offset, searchQuery }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('api/product/search_for_crm/', {
        params: {
          limit,
          offset,
          search_query: searchQuery
        }
      })

      return {
        products: response.data.products,
        totalCount: response.data.total_count,
        pageNumber: Math.floor(offset / limit)
      }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

export type CreateProductParams = Pick<
  ProductResponse,
  'name' | 'description' | 'product_status' | 'sub_categories'
> & { main_category: number }

export const createNewProduct = createAsyncThunk<string, CreateProductParams>(
  'api/create-product',
  async (product, thunkAPI) => {
    try {
      const response = await axiosInstance.post('api/product/create', {
        name: product.name,
        description: product.description,
        product_category_id: product.main_category,
        sub_categories_id: product.sub_categories,
        product_status: product.product_status,
        new_product: true,
        is_popular: false
      })

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
    const response = await axiosInstance.post(
      'api/images/create_img_product',
      imageFile,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log('✌️response --->', response)

    return response.data
  } catch (e) {
    const error = e as AxiosError

    Report.failure('Помилка', 'Помилка під час завантаження файлів', 'Добре')
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
      const response = await axiosInstance.post('api/price/create', {
        product_id: productId,
        weight: price.weight,
        price: price.price,
        old_price: price.priceSale,
        quantity: price.availability,
        is_active: price.active,
        promotional: price.sale
      })
      return response.data
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
