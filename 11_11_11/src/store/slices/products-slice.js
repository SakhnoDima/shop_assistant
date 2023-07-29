import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async function (_, {dispatch, getState}) {
        const currentPage = getState().products.currentPage
        const response = await fetch(`https://nothingtosay322.pythonanywhere.com/products?page=${currentPage}&size=4`)
        dispatch(setFetching(false));
        dispatch(setCurrentPage());

        return response.json();
    }
);

const initialState = {
    products: [],
    status: null,
    error: null,
    currentPage: 1,
    totalCount: 0,
    isFetching: true,
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
            state.status = 'loading';
            state.error = null;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            // console.log(action.payload)
            state.products = [...state.products, ...action.payload.products];
            state.totalCount = action.payload.total;
        },
        [getProducts.rejected]: (state, action) => {
        },
    }
})

export const {setProducts, setFetching, setCurrentPage} = productsSlice.actions;
export default productsSlice.reducer;