import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async function ({id}, {dispatch, getState}) {
        const response = await fetch(`https://nothingtosay322.pythonanywhere.com/product/${id}`)


        const data = await response.json();
        return data;
    }
);

const initialState = {
    product: {},
    isLoading: true,
    error: null,
}

const soloProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProduct.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.product = action.payload.product;
        },
        [getProduct.rejected]: (state, action) => {
        },
    }
})

export const {} = soloProductSlice.actions;
export default soloProductSlice.reducer;