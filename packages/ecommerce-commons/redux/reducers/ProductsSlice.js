import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../services/products";

const initialState = {
    list: []
};

export const productRequest = createAsyncThunk(
    "product/request",
    async (params, { dispatch }) => {
        const products = await fetchProducts();
        return {
            data: products
        }
    }
)
export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadProductList: (state, action) => loadProducts(state, action),
    },
    extraReducers: {
        [productRequest.fulfilled]: (state, action) => {
            const info = action.payload;
            if (!info) return
            state.list = info.data;
        },
    }
})

const loadProducts = (state, action) => {
    state.list = action.payload
}

export const { loadProductList } = ProductsSlice.actions;
export default ProductsSlice.reducer;
