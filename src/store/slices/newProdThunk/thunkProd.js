import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BASE_URL = "https://shop.band-it.space/wp-json/wc/v2/";
export const U_NAME = "ck_4257ca026c0fcfb7d57af60624bc9c0c2cbc8e39";
export const U_PSS = "cs_3e2cf4e3e54fe5b1a2be4db923d2c8ac1e65d8eb";

export const getNewProducts = createAsyncThunk(
  "products/getNewProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + "products", {
        auth: {
          username: U_NAME,
          password: U_PSS,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
