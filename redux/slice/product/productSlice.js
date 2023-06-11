import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      // console.log(action.payload);
      state.products = action.payload.products;
      // console.log(action.payload.products);
    },
  },
});

export const { STORE_PRODUCTS } = productSlice.actions;

export const selectProducts = (state) => state.product.products;

export default productSlice.reducer;
