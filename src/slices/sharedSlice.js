import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    pageTitle: "",
    loader: false,
    deleteModal: false,
    deleteId: null,
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
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setIndustries: (state, action) => {
      state.industries = action.payload;
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
  },
});

export const {
  setLoader,
  setMode,
  setPageTitle,
  setDeleteModal,
  setIndustries,
  setProductFamilies,
  setProductFamilyModal,
  setProductFamilyCrud,
  setDeleteId,
} = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
