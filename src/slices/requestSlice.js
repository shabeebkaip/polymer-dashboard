import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    quotes: [],
    quote: {},
    samples: [],
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
  },
});
export const { setQuotes, setSamples, setModal, setQuote } =
  requestSlice.actions;
export const requestReducer = requestSlice.reducer;
