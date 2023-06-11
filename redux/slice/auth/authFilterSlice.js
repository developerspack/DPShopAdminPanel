import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredAuths: [],
};

const authFilterSlice = createSlice({
  name: "authFilter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { auth, search } = action.payload;
      const tempauths = auth.filter((auth) =>
        auth.email.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredAuths = tempauths;
    },
    SORT_AUTH(state, action) {
      const { auth, sort } = action.payload;
      let tempAuths = [];
      if (sort === "latest") {
        tempAuths = auth;
      }

      if (sort === "a-z") {
        tempAuths = auth.slice().sort(function (a, b) {
          return a.email.localeCompare(b.email);
        });
      }
      if (sort === "z-a") {
        tempAuths = auth.slice().sort(function (a, b) {
          return b.email.localeCompare(a.email);
        });
      }

      state.filteredAuths = tempAuths;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_AUTH } = authFilterSlice.actions;

export const selectFilteredAuth = (state) => state.filterAuth.filteredAuths;

export default authFilterSlice.reducer;
