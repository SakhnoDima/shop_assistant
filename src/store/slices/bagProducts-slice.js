import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getBagProducts = createAsyncThunk(
    'bagProductsSlice/getBagProducts',
    async function (_, {getState}) {
        const listProducts = getState().bagProducts.locIdProducts;
        const response = await fetch(`https://nothingtosay322.pythonanywhere.com/isExistSizes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listProducts)
        });

        const data = await response.json();
        return data
    }
);

const initialState = {
    locIdProducts: [],
    bagProducts: [],
    isLoading: true,
    error: null,
}

const bagProductsSlice = createSlice({
    name: "bagProducts",
    initialState,
    reducers: {
        setLocIdProducts: (state, action) => {
            state.locIdProducts = action.payload;
        },
        addProductInBag: (state, action) => {
            state.locIdProducts = [...state.locIdProducts, action.payload]
        }
    },
    extraReducers: {
        [getBagProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getBagProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bagProducts = action.payload;
        },
        [getBagProducts.rejected]: (state, action) => {
        },
    }
})

export const {setLocIdProducts, addProductInBag} = bagProductsSlice.actions;
export default bagProductsSlice.reducer;