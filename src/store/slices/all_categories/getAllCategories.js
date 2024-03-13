import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL, authData } from "@/constants/constants";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "products/categories", {
        auth: authData,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
