import { createSlice } from "@reduxjs/toolkit";

const sharedSlice = createSlice({
  name: "shared",
  initialState: {
    loader: false,
    industries: [],
  },
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setIndustries: (state, action) => {
      state.industries = action.payload;
    },
  },
});

export const { setLoader, setIndustries } = sharedSlice.actions;
export const sharedReducer = sharedSlice.reducer;
