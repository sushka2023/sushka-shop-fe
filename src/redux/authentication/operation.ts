import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TokenModel, UserResponse } from '../../types'
import { OperationType, SignUpFormData } from './slice'

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
      const response = await axios.post(`api/auth/signup`, {
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
      const response = await axios.post(
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
>('api/currentUser', async ({ accessToken, operationType }, thunkAPI) => {
  try {
    const response = await axios.get('api/users/me/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
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
  async ({ accessToken }, thunkAPI) => {
    try {
      const response = await axios.post('api/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    } catch (e) {
      const error = e as AxiosError

      return thunkAPI.rejectWithValue(error?.response?.status)
    }
  }
)
