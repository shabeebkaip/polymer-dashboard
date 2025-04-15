import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { combineReducers } from "redux";
import { sharedReducer } from "./slices/sharedSlice";

const reducer = combineReducers({
  productState: productReducer,
  sharedState: sharedReducer,
});
const store = configureStore({
  reducer: reducer,
});
export default store;
