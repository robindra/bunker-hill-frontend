import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./config-slice";
import LoginSlice from "./login-slice";

const store = configureStore({
    reducer: {
        config: configSlice.reducer,
        login: LoginSlice.reducer
    }
});

export default store; 