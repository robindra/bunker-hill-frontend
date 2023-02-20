import { createSlice } from '@reduxjs/toolkit';
const LoginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: false
    },
    reducers: {
        setLoginState(state, action) {
            console.log(action)
            state.isLogin = action.payload
        }
    }
});

const sendCardData = (cartData) => {
    return (dispatch) => {
        dispatch();
    }
}
export const LoginActions = LoginSlice.actions;
export default LoginSlice;