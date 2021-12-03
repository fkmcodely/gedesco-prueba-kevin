import axios from "axios";
import { PRODUCTS } from "../constants";

export const fetchProducts = async () => {
    try {
        const { data } = await axios(`${PRODUCTS}?limit=40`);
        return data;
    } catch (error) {
        console.error(`No se han obtenido los productos`);
    }
};

export const fetchSingleProduct = async (id) => {
    try {
        const { data } = await axios(`${PRODUCTS}/${id}`);
        return data;
    } catch (error) {
        console.error(`No se han obtenido los productos`);
    }
};