import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer:{
        // Reducers
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})