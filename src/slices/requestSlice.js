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
  },
});
export const { setQuotes, setSamples, setModal, setQuote, setSample, setFinance, setFinances } =
  requestSlice.actions;
export const requestReducer = requestSlice.reducer;
