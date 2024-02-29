import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL, U_NAME, U_PSS } from "./../newProdThunk/thunkProd.js";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://shop.band-it.space/wp-json/wc/v3/" + "products/categories",
        {
          auth: {
            username: U_NAME,
            password: U_PSS,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
