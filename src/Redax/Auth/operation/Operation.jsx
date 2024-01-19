import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "api/signUp",
  async ({ user, operationType }, thunkAPI) => {
    try {
      const response = await axios.post(`api/auth/signup`, {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password_checksum: user.repeatPassword,
      });
      return { data: response.data, operationType };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "api/login",
  async ({ user, operationType }, thunkAPI) => {
    try {
        const response = await axios.post("api/auth/login", {
         username: user.email,
         password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        });
      return { data: response.data, operationType };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);