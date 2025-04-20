import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    pageTitle: "",
    loader: false,
    mode: "add",
    // industries
    industries: [],
    // product families
    productFamilies: [],
    productFamilyModal: false,
    productFamilyCrud: {},
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
    setProductFamilyModal: (state, action) => {
      state.productFamilyModal = action.payload;
    },
    setProductFamilyCrud: (state, action) => {
      state.productFamilyCrud = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  setLoader,
  setMode,
  setPageTitle,
  setIndustries,
  setProductFamilies,
  setProductFamilyModal,
  setProductFamilyCrud,
} = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
