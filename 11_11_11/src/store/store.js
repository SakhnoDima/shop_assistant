import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import soloProductSlice from "@/store/slices/soloProduct-slice";

export default configureStore({
    reducer: {
        products: productsSlice,
        product: soloProductSlice,
    }
})