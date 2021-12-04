import axios from "axios";
import { USERS, LOGIN } from "../constants";


export const getAllUsers = async () => {
    try {
        const users = await axios(USERS);
        return users.data;
    } catch (err) {
        return null;
    }
};

export const getUserByUsername = async (id) => {
    try {
        const users = await axios(USERS);
        return users.data;
    } catch (err) {
        return null;
    }
};

export const createUser = async (user) => {
    try {
        const create = await axios.post(USERS, user);
        return create.data;
    } catch (error) {
        return null;
    }
};

export const loginUser = async (username, password) => {
    try {
        const checkUser = await axios.post(LOGIN, {
            username: username,
            password: password
        });
        return checkUser.data;
    } catch (err) {
        return null;
    }
}