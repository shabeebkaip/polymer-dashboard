import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { combineReducers } from "redux";
import { sharedReducer } from "./slices/sharedSlice";
import { requestReducer } from "./slices/requestSlice";

const reducer = combineReducers({
  productState: productReducer,
  sharedState: sharedReducer,
  requestState: requestReducer,
});
const store = configureStore({
  reducer: reducer,
});
export default store;
