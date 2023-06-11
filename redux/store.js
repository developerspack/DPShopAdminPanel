import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/product/productSlice";
import productFilterReducer from "./slice/product/productFilterSlice";
import categoryReducer from "./slice/category/categorySlice";
import categoryFilterReducer from "./slice/category/categoryFilterSlice";
import brandFilterReducer from "./slice/brand/brandFilter";
import brandReducer from "./slice/brand/brandSlice";
import authFilterReducer from "./slice/auth/authFilterSlice";
import authReducer from "./slice/auth/authSlice";
import orderReducer from "./slice/orders/ordersSlice";
import orderFilterReducer from "./slice/orders/ordersFilterSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filterProduct: productFilterReducer,
    category: categoryReducer,
    filterCategory: categoryFilterReducer,
    brand: brandReducer,
    filterBrand: brandFilterReducer,
    auth: authReducer,
    filterAuth: authFilterReducer,
    order: orderReducer,
    filterOrder: orderFilterReducer,
  },
});
