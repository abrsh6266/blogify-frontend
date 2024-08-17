import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import postReducer from "../slices/postSlice";
import categoryReducer from "../slices/categorySlice";

//! Store

const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    categories: categoryReducer,  
  },
});

export default store;
