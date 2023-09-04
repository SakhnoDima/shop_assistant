import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import soloProductSlice from "@/store/slices/soloProduct-slice";
import bagProducts from "@/store/slices/bagProducts-slice";

export default configureStore({
    reducer: {
        products: productsSlice,
        product: soloProductSlice,
        bagProducts: bagProducts,
    }
})