import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userImageUrl: null,
  userID: null,
  auth: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    STORE_AUTH(state, action) {
      // console.log(action.payload);
      state.auth = action.payload.auth;
      // console.log(action.payload.products);
    },
    //Actions
    hydrateUser: (state, action) => {
      return action.payload;
    },
    //Add user to auth
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, userName, userImageUrl, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userImageUrl = userImageUrl;
      state.userID = userID;
      // console.log(action.payload);
      // console.log(userName);
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userImageUrl = null;
      state.userID = null;
    },
  },
});

export const { hydrateUser, SET_ACTIVE_USER, REMOVE_ACTIVE_USER, STORE_AUTH } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectuserImage = (state) => state.auth.userImageUrl;
export const selectAuth = (state) => state.auth.auth;

export default authSlice.reducer;
