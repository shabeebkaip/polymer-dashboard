import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    loader: false,
    industries: [],
    productFamilies: [],
    pageTitle: "",
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setIndustries: (state, action) => {
      state.industries = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setProductFamilies: (state, action) => {
      state.productFamilies = action.payload;
    },
  },
});

export const { setLoader, setIndustries, setPageTitle, setProductFamilies } =
  sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
