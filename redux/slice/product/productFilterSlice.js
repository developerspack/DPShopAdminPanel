import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const productFilterSlice = createSlice({
  name: "ProductFilter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.Name.toLowerCase().includes(search.toLowerCase()) ||
          product.Category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.Price - b.Price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.Price - a.Price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.Name.localeCompare(b.Name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.Name.localeCompare(a.Name);
        });
      }

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS } = productFilterSlice.actions;

export const selectFilteredProducts = (state) =>
  state.filterProduct.filteredProducts;

export default productFilterSlice.reducer;
