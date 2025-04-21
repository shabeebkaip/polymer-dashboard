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
    industryModal: false,
    industryCrud: {},
    // product families
    productFamilies: [],
    productFamilyModal: false,
    productFamilyCrud: {},
    // Brands
    brands: [],
    // appearance
    appearance: [],
    // substance
    substance: [],
    // grade
    grade: [],
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
    // industries
    setIndustries: (state, action) => {
      state.industries = action.payload;
    },
    setIndustryModal: (state, action) => {
      state.industryModal = action.payload;
    },
    setIndustryCrud: (state, action) => {
      state.industryCrud = action.payload;
    },
    // product families
    setProductFamilies: (state, action) => {
      state.productFamilies = action.payload;
    },
    setProductFamilyModal: (state, action) => {
      state.productFamilyModal = action.payload;
    },
    setProductFamilyCrud: (state, action) => {
      state.productFamilyCrud = action.payload;
    },
    // Brands
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    // appearance
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    // substance
    setSubstance: (state, action) => {
      state.substance = action.payload;
    },
    // grade
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
  },
});

export const {
  setLoader,
  setMode,
  setPageTitle,
  setDeleteModal,
  setDeleteId,
  // industries
  setIndustries,
  setIndustryModal,
  setIndustryCrud,
  // product families
  setProductFamilies,
  setProductFamilyModal,
  setProductFamilyCrud,
  // Brands
  setBrands,
  // appearance
  setAppearance,
  // substance
  setSubstance,
  // grade
  setGrade,
} = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
