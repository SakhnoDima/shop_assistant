import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL, authData } from "@/constants/constants";

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + `products/${id}`, {
        auth: authData,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const getProduct = createAsyncThunk(
//   "product/getProduct",
//   async function ({ id }, { dispatch, getState }) {
//     const response = await fetch(
//       `https://nothingtosay322.pythonanywhere.com/product/${id}`
//     );

//     const data = await response.json();
//     return data;
//   }
// );

const initialState = {
  product: {},
  isLoading: true,
  error: null,
};

const soloProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductById.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    [getProductById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {} = soloProductSlice.actions;
export default soloProductSlice.reducer;
