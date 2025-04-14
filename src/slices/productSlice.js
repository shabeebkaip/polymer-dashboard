import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productLoader: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductLoader: (state, action) => {
      state.productLoader = action.payload;
    },
  },
});

export const { setProducts, setProductLoader } = productSlice.actions;
export const productReducer = productSlice.reducer;
