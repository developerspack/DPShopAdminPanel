import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredOrders: [],
};

const orderFilterSlice = createSlice({
  name: "orderFilter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { orders, search } = action.payload;
      const temporders = orders.filter((order) =>
        order.userEmail.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredOrders = temporders;
    },
    SORT_ORDERS(state, action) {
      const { orders, sort } = action.payload;
      let temporders = [];
      if (sort === "latest") {
        temporders = orders;
      }

      if (sort === "lowest-price") {
        temporders = orders.slice().sort((a, b) => {
          return a.orderAmount - b.orderAmount;
        });
      }

      if (sort === "highest-price") {
        temporders = orders.slice().sort((a, b) => {
          return b.orderAmount - a.orderAmount;
        });
      }

      if (sort === "a-z") {
        temporders = orders.slice().sort((a, b) => {
          return a.userEmail.localeCompare(b.userEmail);
        });
      }
      if (sort === "z-a") {
        temporders = orders.slice().sort((a, b) => {
          return b.userEmail.localeCompare(a.userEmail);
        });
      }

      state.filteredOrders = temporders;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_ORDERS } = orderFilterSlice.actions;

export const selectFilteredOrders = (state) => state.filterOrder.filteredOrders;

export default orderFilterSlice.reducer;
