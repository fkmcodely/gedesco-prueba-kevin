import axios from "axios";
import { CARTS } from "../constants";

export const createCart = async (cart) => {
    try {
        const { data } = await axios.post(`${CARTS}`, cart);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getCart = async () => {
    try {
        const { data } = await axios.post(`${CARTS}`);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const getCartByUser = async (id) => {
    try {
        const { data } = await axios(`${CARTS}/user/${id}`);
        return data;
    } catch (err) {
        console.error(err);
    }
};