import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Report } from "notiflix/build/notiflix-report-aio";

export const fetchMainCategories = createAsyncThunk(
  "api/crm-main-categories",
  async ({ operationType }, thunkAPI) => {
    try {
      const response = await axios.get("api/product_category/all");
      return { data: response.data, operationType };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdG9yZS5zdXNoa2EubW9kQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI4MDA1NCwiZXhwIjoxNzA0NjM2ODU0LCJzY29wZSI6ImFjY2Vzc190b2tlbiJ9.z_KIXuGOq-9irj5FaD8-V_npsKMYG7r6j9BXum1vOtY";

export const fetchSubCategories = createAsyncThunk(
    "api/crm-sub-categories",
    async ({ operationType }, thunkAPI) => {
        try {
          const response = await axios.get(
            "api/product_sub_category/all_for_crm",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return { data: response.data, operationType };
        } catch (e) {
          return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const createNewProduct = createAsyncThunk(
  "api/create-product",
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(
        "api/product/create",
        {
          name: product.name,
          description: product.description,
          product_category_id: product.main_category,
          sub_categories_id: product.sub_categories,
          product_status: product.product_status,
          promotional: true,
          new_product: true,
          is_popular: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // product.price.map((price) => {
      //   await axios.post(
      //     "api/price/create",
      //     {
      //       product_id: response.data.id,
      //       weight: price.weight.toString(),
      //       price: parseInt(price.price),
      //   })
      // })
      
      return response.data.id
    } catch (e) {
      Report.failure(
        "Упс... сталася помилка",
        `Заплатіть своїм розробникам для вирішення ${e.message}`,
        "Добре"
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addImages = createAsyncThunk(
  "api/create-images",
  async (imageFile, thunkAPI) => {
    try {
      const response = await axios.post(
        "api/images/create_img_product",
        imageFile,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      
      return response.data;
    } catch (e) {
      Report.failure(
        "Помилка під час завантаження файлів",
        "Заплатіть своїм розробникам",
        "Добре"
      );
      return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
  }
);