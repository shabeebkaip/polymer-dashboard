import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    quotes: [],
    quote: {},
    samples: [],
    sample: {},
    modal: false,
  },
  reducers: {
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
export const { setQuotes, setSamples, setModal, setQuote, setSample } =
  requestSlice.actions;
export const requestReducer = requestSlice.reducer;
