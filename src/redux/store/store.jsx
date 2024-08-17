import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice";

//! Store

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
  },
});

export default store;
