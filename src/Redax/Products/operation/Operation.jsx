import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://www.test-store.shop/";

export const fetchItems = createAsyncThunk(
  "api/product",
  async ({ params, operationType }, thunkAPI) => {
    try {
      const response = await axios.get(
        `api/product/all?limit=9&offset=${params}&sort=name`
      );
      return { data: response.data, operationType };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllCategories = async () => {
  try {
    const qwe = await axios
      .get("api/product_category/all")
      .then((categories) => categories.data);
    return qwe;
  } catch (e) {
    console.log(e);
  }
};
