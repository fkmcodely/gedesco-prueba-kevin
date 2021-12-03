import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    userId: null,
    date: moment().format("YYYY-MM-DD"),
    products: []
}

export const cartRequest = createAsyncThunk(
    "cart/request",
    async (params, { dispatch }) => {
        dispatch(clearCart());
    }
)

export const CartSlice = createSlice({
    name: 'cart/request',
    initialState,
    reducers: {
        addProduct: (state, action) => addProductItem(state, action),
        deleteProduct: (state, action) => deleteProductItem(state, action),
        clearCart: (state, action) => clearCartProducts(state, action)
    },
    extraReducers: {
        [cartRequest.fulfilled]: () => { }
    }
})

const clearCartProducts = (state, action) => {
    state.products = [];
};

const addProductItem = (state, action) => {
    const { id } = action.payload;
    const existItemIntoCart = current(state.products).some(product => parseInt(product.productId) === parseInt(id));
    if (existItemIntoCart) {
        state.products = state.products.map((product) => {
            if (product.productId === id) {
                return { productId: product.productId, quantity: parseInt(product.quantity) + 1 }
            } else {
                return product;
            }
        });
        return;
    }
    state.products = [...state.products, { productId: action.payload.id, quantity: 1 }];
};

const deleteProductItem = (state, action) => {
    const { id } = action.payload;
    const existItemIntoCart = current(state.products).some(product => parseInt(product.productId) === parseInt(id));
    if (existItemIntoCart) {
        state.products = state.products.map((product) => {
            if (product.productId === id) {
                return { productId: product.productId, quantity: parseInt(product.quantity) - 1 }
            } else {
                return product;
            }
        });
    }
};


export const { addProduct, deleteProduct, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
