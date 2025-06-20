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
    dealQuotes:[],
    dealQuote:{},
    supplierOffers: [],
    supplierOffer: {},
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
setDealQuotes: (state, action) => {
  state.dealQuotes = action.payload;
},
setDealQuote: (state, action) => {
  state.dealQuote = action.payload;
},
setSupplierOffers: (state, action) => {
  state.supplierOffers = action.payload;
},
setSupplierOffer: (state, action) => {
  state.supplierOffer = action.payload;
}
    },
});
export const { setQuotes, setSamples, setModal, setQuote, setSample, setFinance, setFinances, setBulkOrder, setBulkOrders, setBestDeals, setBestDeal, setDealQuotes, setDealQuote,setSupplierOffers, setSupplierOffer } =
  requestSlice.actions;
export const requestReducer = requestSlice.reducer;
