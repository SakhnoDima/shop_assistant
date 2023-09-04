import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async function (_, {dispatch, getState}) {
        const currentPage = getState().products.currentPage;
        const {sort, filters} = getState().products;
        const response = await fetch(`https://nothingtosay322.pythonanywhere.com/products?page=${currentPage}&size=5`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                sort_order: sort.sort_order,
                // included_brands: filters.included_brands,
                // included_categories: filters.included_categories,
                // max_price: filters.max_price,
                // min_price: filters.min_price,
                // included_sizes: filters.included_sizes,
            })
        });
        dispatch(setFetching(false));
        dispatch(setCurrentPage());

        const data = await response.json();
        return data;
    }
);

const initialState = {
    products: [],
    isLoading: true,
    error: null,
    currentPage: 1,
    totalCount: 0,
    isFetching: true,
    sort: {
        sort_order: "price",
    },
    filters: {
        included_brands: ['ADIDAS', 'PUMA'],
        included_categories: ['SNEAKERS'],
        price: ['0-999', '1000-2499'],
        included_sizes: ['40', '41'],
    },


}

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
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = [...state.products, ...action.payload.products];
            state.totalCount = action.payload.total;
        },
        [getProducts.rejected]: (state, action) => {
        },
    }
})

export const {setProducts, setFetching, setCurrentPage} = productsSlice.actions;
export default productsSlice.reducer;