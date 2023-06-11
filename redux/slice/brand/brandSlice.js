import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    STORE_BRAND(state, action) {
      // console.log(action.payload);
      state.brand = action.payload.brand;
      // console.log(action.payload.products);
    },
  },
});

export const { STORE_BRAND } = brandSlice.actions;

export const selectBrand = (state) => state.brand.brand;

export default brandSlice.reducer;
