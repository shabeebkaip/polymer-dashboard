import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { combineReducers } from "redux";

const reducer = combineReducers({
  productState: productReducer,
});
const store = configureStore({
  reducer: reducer,
});
export default store;
