import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    quotes: [],
    quote: {},
    samples: [],
    sample: {},
    finances: [],
    finance: {},
    bulkOrders: [],
    bulkOrder: {},
    bestDeals: [],
    bestDeal:{},
    modal: false,
  },
  reducers: {
    setFinances: (state, action) => {
      state.finances = action.payload;
    },
    setFinance: (state, action) => {
      state.finance = action.payload;
    },
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
    setSamples: (state, action) => {
      state.samples = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    setSample: (state, action) => {
      state.sample = action.payload;
    },
    setBulkOrder: (state, action) => {
      state.bulkOrder = action.payload;
    },
    setBulkOrders: (state, action) => {
      state.bulkOrders = action.payload;
    },
    setBestDeals: (state, action) => {
      state.bestDeals = action.payload;
    },
    setBestDeal: (state, action) => {
      state.bestDeal = action.payload;
    },
    },
});
export const { setQuotes, setSamples, setModal, setQuote, setSample, setFinance, setFinances, setBulkOrder, setBulkOrders, setBestDeals, setBestDeal } =
  requestSlice.actions;
export const requestReducer = requestSlice.reducer;
