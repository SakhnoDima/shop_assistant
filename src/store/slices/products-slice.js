import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChoiceCategory from "@/components/choice_category/ChoiceCategory";
import { useDispatch } from "react-redux";
import { getNewProducts } from "./newProdThunk/thunkProd";
import { getAllCategories } from "./allCategories/getAllCategories";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async function (_, { dispatch, getState }) {
    const currentPage = getState().products.currentPage;
    const { sort, filters } = getState().products;
    const response = await fetch(
      `https://nothingtosay322.pythonanywhere.com/products?page=${currentPage}&size=5`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sort_order: sort.sort_order,
          included_brands: filters.included_brands,
          included_categories: filters.included_categories,
          prices: filters.prices,
          included_sizes: filters.included_sizes,
        }),
      }
    );
    dispatch(setFetching(false));
    dispatch(setCurrentPage());

    const data = await response.json();
    return data;
  }
);

const initialState = {
  products: [],
  categories: [],
  isLoading: true,
  error: null,
  currentPage: 1,
  totalCount: 0,
  isFetching: true,
  sort: {
    sort_order: "price",
  },
  filters: {
    included_brands: [],
    included_categories: ["SNEAKERS", "POLOS", "SHIRT"],
    prices: [],
    included_sizes: [],
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage += 1;
    },
    changesInCategories: (state, action) => {
      state.products = [];
      state.currentPage = 1;
    },
    setCategory: (state, action) => {
      state.filters.included_brands = [];
      state.filters.prices = [];
      state.filters.included_sizes = [];
      if (action.payload === null) {
        state.filters.included_categories = [];
      } else {
        state.filters.included_categories = [action.payload];
      }
    },
    deleteFilt: (state, action) => {
      const category = action.payload.category;

      state.filters[`${category}`] = state.filters[`${category}`].filter(
        (name) => name !== action.payload.name
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewProducts.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNewProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = [...payload];
      })
      .addCase(getNewProducts.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getAllCategories.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = [...payload];
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
    // [getProducts.pending]: (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // [getProducts.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.products = [...state.products, ...action.payload.products];
    //   state.totalCount = action.payload.total;
    // },
    // [getProducts.rejected]: (state, action) => {},
  },
});

export const {
  setProducts,
  setFetching,
  setCurrentPage,
  changesInCategories,
  setCategory,
  deleteFilt,
} = productsSlice.actions;
export default productsSlice.reducer;
