import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";

//! Store

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
