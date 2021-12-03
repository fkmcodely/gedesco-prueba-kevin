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