import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      // console.log(action.payload);
      state.orders = action.payload.orders;
      // console.log(action.payload.products);
    },
  },
});

export const { STORE_ORDERS } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
