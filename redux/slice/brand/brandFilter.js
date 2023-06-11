import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredBrand: [],
};

const brandFilterSlice = createSlice({
  name: "brandFilter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { brand, search } = action.payload;
      const brandSearch = brand.filter((brand) =>
        brand.Brand.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredBrand = brandSearch;
    },
    SORT_BRAND(state, action) {
      const { brand, sort } = action.payload;
      let brandSort = [];
      if (sort === "latest") {
        brandSort = brand;
      }
      if (sort === "a-z") {
        brandSort = brand.slice().sort((a, b) => {
          return a.Brand.localeCompare(b.Brand);
        });
      }
      if (sort === "z-a") {
        brandSort = brand.slice().sort((a, b) => {
          return b.Brand.localeCompare(a.Brand);
        });
      }

      state.filteredBrand = brandSort;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_BRAND } = brandFilterSlice.actions;

export const selectFilteredbrand = (state) => state.filterBrand.filteredBrand;

export default brandFilterSlice.reducer;
