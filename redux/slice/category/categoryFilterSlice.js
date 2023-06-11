import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCategory: [],
};

const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { category, search } = action.payload;
      const categorySearch = category.filter((category) =>
        category.Category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredCategory = categorySearch;
    },
    SORT_CATEGORY(state, action) {
      const { category, sort } = action.payload;
      let categorySort = [];
      if (sort === "latest") {
        categorySort = category;
      }
      if (sort === "a-z") {
        categorySort = category.slice().sort((a, b) => {
          return a.Category.localeCompare(b.Category);
        });
      }
      if (sort === "z-a") {
        categorySort = category.slice().sort((a, b) => {
          return b.Category.localeCompare(a.Category);
        });
      }

      state.filteredCategory = categorySort;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_CATEGORY } = categoryFilterSlice.actions;

export const selectFilteredCategory = (state) =>
  state.filterCategory.filteredCategory;

export default categoryFilterSlice.reducer;
