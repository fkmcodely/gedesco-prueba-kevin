import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import ProductsSlice from "./reducers/ProductsSlice";
import CartSlice from "./reducers/CartSlice";

export const store = configureStore({
    reducer: {
        user: UserSlice,
        products: ProductsSlice,
        cart: CartSlice
    }
});