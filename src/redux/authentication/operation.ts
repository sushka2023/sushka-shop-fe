import { AxiosError } from 'axios'
import axiosInstance from '../../axios/settings'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TokenModel, UserResponse } from '../../types'
import { OperationType, SignUpFormData } from './slice'
import Cookies from 'js-cookie'

const COOKIE_TOKEN_NAME = 'token'

export type LoginBody = {
  email: string
  password: string
}

type SignUpParams = {
  user: SignUpFormData
  operationType: OperationType
}

type SignUpResponse = {
  data: UserResponse
  operationType: OperationType
}

export const signUp = createAsyncThunk<SignUpResponse, SignUpParams>(
  'api/signUp',
  async ({ user, operationType }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/auth/signup`, {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password_checksum: user.repeatPassword
      })
      return { data: response.data, operationType }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type LoginParams = {
  user: LoginBody
  operationType: OperationType
}

type LoginResponse = {
  data: TokenModel
  operationType: OperationType
}

export const login = createAsyncThunk<LoginResponse, LoginParams>(
  'api/login',
  async ({ user, operationType }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        'api/auth/login',
        {
          username: user.email,
          password: user.password
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      Cookies.set(COOKIE_TOKEN_NAME, response.data.access_token, { expires: 7 })

      return { data: response.data, operationType }
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type CurrentUserParams = {
  accessToken: string
  operationType: OperationType
}

type CurrentUserResponse = {
  data: UserResponse
  operationType: OperationType
}

export const currentUser = createAsyncThunk<
  CurrentUserResponse,
  CurrentUserParams
>('api/currentUser', async ({ operationType }, thunkAPI) => {
  try {
    const response = await axiosInstance.get('api/users/me/')
    return { data: response.data, operationType }
  } catch (e) {
    const error = e as AxiosError

    return thunkAPI.rejectWithValue(error?.response?.status)
  }
})

type LogOutParams = {
  accessToken: string
}

export const logout = createAsyncThunk<any, LogOutParams>(
  'api/logOut',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post('api/auth/logout', null)
      Cookies.remove(COOKIE_TOKEN_NAME)
      return response
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
