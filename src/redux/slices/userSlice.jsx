import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//initialState
const InitialState = {
  loading: false,
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
    userInfo: {},
  },
};

//! Login Action

export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, dispatch }) => {
    //making request
    try {
      const response = await axios.post(
        "https://blogify-api-tawny.vercel.app/api/v1/users/login",
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! UserSlice
const userSlice = createSlice({
  name: "users",
  initialState: InitialState,
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    //fulfilled
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    //*failed
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

//! generate reducer

const userReducer = userSlice.reducer;

export default userReducer;
