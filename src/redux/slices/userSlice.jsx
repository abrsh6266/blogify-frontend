import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import errorMsg from "../../components/alerts/ErrorMsg";
import successMsg from "../../components/alerts/SuccessMsg";

// Initial State
const InitialState = {
  loading: false,
  success: false,
  error: null,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login Action

export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue }) => {
    // Making request
    try {
      const { data } = await axios.post(
        "https://blogify-api-tawny.vercel.app/api/v1/users/login",
        payload
      );
      //! Save user info into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Register Action

export const RegisterAction = createAsyncThunk(
  "users/register", // Updated action type to "users/register"
  async (payload, { rejectWithValue }) => {
    // Making request
    try {
      const { data } = await axios.post(
        "https://blogify-api-tawny.vercel.app/api/v1/users/register",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Logout Action

export const logoutAction = createAsyncThunk("users/logout", async () => {
  // Removing from local storage
  localStorage.removeItem("userInfo");
  window.location.reload();
  return true;
});

//! UserSlice
const userSlice = createSlice({
  name: "users",
  initialState: InitialState,
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
      successMsg(state.userAuth.userInfo.message);
    });
    // Rejected
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      errorMsg(state.error.message);
    });

    // Register
    builder.addCase(RegisterAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(RegisterAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
      successMsg(state.user.message);
    });
    // Rejected
    builder.addCase(RegisterAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      errorMsg(state.error.message);
    });
  },
});

//! Generate reducer
const userReducer = userSlice.reducer;

export default userReducer;
