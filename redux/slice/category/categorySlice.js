import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    STORE_CATEGORY(state, action) {
      // console.log(action.payload);
      state.category = action.payload.category;
      // console.log(action.payload.products);
    },
  },
});

export const { STORE_CATEGORY } = categorySlice.actions;

export const selectCategory = (state) => state.category.category;

export default categorySlice.reducer;
