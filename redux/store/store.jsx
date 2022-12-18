import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import searchReducer from "../features/search/searchSlice";

export default configureStore({
    reducer:{
        cart: cartReducer,
        search: searchReducer
    },
})