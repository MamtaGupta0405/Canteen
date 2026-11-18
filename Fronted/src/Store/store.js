import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import ProductReducer from "./Product/ProductSlice";

export const store = configureStore({
  reducer: { userReducer,ProductReducer },
});
