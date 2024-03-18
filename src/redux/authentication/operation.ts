import { AxiosError } from 'axios'
import axiosInstance from '../../axios/settings'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TokenModel, UserResponse } from '../../types'
import { OperationType, AuthFormData } from './slice'
import { setToken, removeToken } from '../../utils/cookie/token'

type SignUpParams = {
  user: AuthFormData
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
  user: AuthFormData
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

      setToken(response.data.access_token)

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

      removeToken()

      return response
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type confirmedEmailParams = {
  confirmedEmailToken: string | null
}

export const confirmedEmail = createAsyncThunk<any, confirmedEmailParams>(
  'api/rconfirmedEmail',
  async ({ confirmedEmailToken }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/auth/confirmed_email/${confirmedEmailToken}`
      )
      return response.data.message
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type ResetPassParams = {
  email: string | undefined
}

export const resetPassword = createAsyncThunk<any, ResetPassParams>(
  'api/resetPass',
  async ({ email }, thunkAPI) => {
    try {
      await axiosInstance.get(`api/auth/reset_password/${email}`)
    } catch (e) {
      const error = e as AxiosError
      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)

type SaveNewPassParams = {
  newPass: string | undefined
  token: string | null
}

export const saveNewPassword = createAsyncThunk<any, SaveNewPassParams>(
  'api/saveNewPass',
  async ({ newPass, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/auth/reset_password/confirmed/${token}`,
        {
          password_checksum: newPass
        }
      )

      return response.data.message
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
