import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCrud: {},
    productLoader: false,
    productModal: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductLoader: (state, action) => {
      state.productLoader = action.payload;
    },
    setProductCrud: (state, action) => {
      state.productCrud = action.payload;
    },
    setProductModal: (state, action) => {
      state.productModal = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductLoader,
  setProductCrud,
  setProductModal,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
