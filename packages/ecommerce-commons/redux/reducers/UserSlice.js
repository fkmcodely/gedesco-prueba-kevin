import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, getAllUsers } from "../../services/users";

const initialState = {
    loggedUser: false,
    userInfo: {}
};

export const userRequest = createAsyncThunk(
    "user/request",
    async (userInfo, { dispatch }) => {
        dispatch(loadUserInfo(userInfo));
    }
);

export const userLoginRequest = createAsyncThunk(
    "user/login",
    async (user, { dispatch }) => {
        dispatch(loadUserInfo(user));
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserInfo: (state, action) => loadUser(state, action),
        logOutSession: (state, action) => logOut(state, action)
    },
    extraReducers: {
        [userRequest.fulfilled]: (state, action) => { }
    }
});

const loadUser = (state, action) => {
    state.userInfo = action.payload;
    state.loggedUser = true;
};

const logOut = (state, action) => { }

export const { loadUserInfo, logOutSession } = UserSlice.actions;
export default UserSlice.reducer;
