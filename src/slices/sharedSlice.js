import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    pageTitle: "",
    loader: false,
    openFilter: { name: "", module: null, isOpen: false },
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
    // polymer type
    polymerType: [],
    polymerTypeModal: false,
    polymerTypeCrud: {},
    // payment terms
    paymentTerms: [],
    paymentTermsModal: false,
    paymentTermsCrud: {},
    // packaging type
    packagingType: [],
    packagingTypeModal: false,
    packagingTypeCrud: {},
    // physical form
    physicalForm: [],
    physicalFormModal: false,
    physicalFormCrud: {},
    // Brands
    brands: [],
    // appearance
    appearance: [],
    // substance
    substance: [],
    // grade
    grade: [],
    gradeModal: false,
    gradeCrud: {},
    // incoterms
    incoterms: [],
    incotermsModal: false,
    incotermsCrud: {},
    // chemical family
    chemicalFamily: [],
    chemicalFamilyModal: false,
    chemicalFamilyCrud: {},
    // bulk Order
    bulkOrderModal: false,
    bulkOrderCrud: {},
    // best deal
    bestDealModal: false,
    bestDealCrud: {},
    // testimonials
    testimonials: [],
    testimonialModal: false,
    testimonialCrud: {},
    //Shipping method
    shippingMethod: [],
    shippingMethodCrud: {},
    shippingMethodModal: false,
  },
  reducers: {
    setOpenFilter: (state, action) => {
      state.openFilter = action.payload;
    },
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

    // social media
    setSocialMedia: (state, action) => {
      state.productFamilies = action.payload;
    },
    setSocialMediaModal: (state, action) => {
      state.productFamilyModal = action.payload;
    },
    setSocialMediaCrud: (state, action) => {
      state.productFamilyCrud = action.payload;
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

    // polymer type
    setPolymerType: (state, action) => {
      state.polymerType = action.payload;
    },
    setPolymerTypeModal: (state, action) => {
      state.polymerTypeModal = action.payload;
    },
    setPolymerTypeCrud: (state, action) => {
      state.polymerTypeCrud = action.payload;
    },

    // payment terms
    setPaymentTerms: (state, action) => {
      state.paymentTerms = action.payload;
    },
    setPaymentTermsModal: (state, action) => {
      state.paymentTermsModal = action.payload;
    },
    setPaymentTermsCrud: (state, action) => {
      state.paymentTermsCrud = action.payload;
    },

    // packaging type
    setPackagingType: (state, action) => {
      state.packagingType = action.payload;
    },
    setPackagingTypeModal: (state, action) => {
      state.packagingTypeModal = action.payload;
    },
    setPackagingTypeCrud: (state, action) => {
      state.packagingTypeCrud = action.payload;
    },

    // physical form
    setPhysicalForm: (state, action) => {
      state.physicalForm = action.payload;
    },
    setPhysicalFormModal: (state, action) => {
      state.physicalFormModal = action.payload;
    },
    setPhysicalFormCrud: (state, action) => {
      state.physicalFormCrud = action.payload;
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
    setGradeModal: (state, action) => {
      state.gradeModal = action.payload;
    },
    setGradeCrud: (state, action) => {
      state.gradeCrud = action.payload;
    },

    // incoterms
    setIncoterms: (state, action) => {
      state.incoterms = action.payload;
    },
    setIncotermsModal: (state, action) => {
      state.incotermsModal = action.payload;
    },
    setIncotermsCrud: (state, action) => {
      state.incotermsCrud = action.payload;
    },

    // chemical family
    setChemicalFamily: (state, action) => {
      state.chemicalFamily = action.payload;
    },
    setChemicalFamilyModal: (state, action) => {
      state.chemicalFamilyModal = action.payload;
    },
    setChemicalFamilyCrud: (state, action) => {
      state.chemicalFamilyCrud = action.payload;
    },

    // bulk order
    setBulkOrderModal: (state, action) => {
      state.bulkOrderModal = action.payload;
    },
    setBulkOrderCrud: (state, action) => {
      state.bulkOrderCrud = action.payload;
    },

    setBestDealModal: (state, action) => {
      state.bestDealModal = action.payload;
    },
    setBestDealCrud: (state, action) => {
      state.bestDealCrud = action.payload;
    },

    // testimonials
    setTestimonials: (state, action) => {
      state.testimonials = action.payload;
    },
    setTestimonialModal: (state, action) => {
      state.testimonialModal = action.payload;
    },
    setTestimonialCrud: (state, action) => {
      state.testimonialCrud = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    setShippingMethodCrud: (state, action) => {
      state.shippingMethodCrud = action.payload;
    },
    setShippingMethodModal: (state, action) => {
      state.shippingMethodModal = action.payload;
    },
  },
});

export const {
  setOpenFilter,
  setLoader,
  setMode,
  setPageTitle,
  setDeleteModal,
  setDeleteId,
  setIndustries,
  setIndustryModal,
  setIndustryCrud,
  setSocialMedia,
  setSocialMediaModal,
  setSocialMediaCrud,
  setProductFamilies,
  setProductFamilyModal,
  setProductFamilyCrud,
  setPolymerType,
  setPolymerTypeModal,
  setPolymerTypeCrud,
  setPaymentTerms,
  setPaymentTermsModal,
  setPaymentTermsCrud,
  setPackagingType,
  setPackagingTypeModal,
  setPackagingTypeCrud,
  setPhysicalForm,
  setPhysicalFormModal,
  setPhysicalFormCrud,
  setBrands,
  setAppearance,
  setSubstance,
  setGrade,
  setGradeModal,
  setGradeCrud,
  setIncoterms,
  setIncotermsModal,
  setIncotermsCrud,
  setChemicalFamily,
  setChemicalFamilyModal,
  setChemicalFamilyCrud,
  setBulkOrderModal,
  setBulkOrderCrud,
  setBestDealModal,
  setBestDealCrud,
  setTestimonials,
  setTestimonialModal,
  setTestimonialCrud,
  setShippingMethod,
  setShippingMethodCrud,
  setShippingMethodModal,
} = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;
