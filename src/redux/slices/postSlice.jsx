import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import errorMsg from "../../components/alerts/ErrorMsg";
import successMsg from "../../components/alerts/SuccessMsg";

// Initial State
const InitialState = {
  loading: false,
  success: false,
  error: null,
  posts: {
    posts:[],
    message:null,
    status:null,
    pagination:{}
  },
  post: null,
};

//! posts Action

export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue }) => {
    // Making request
    try {
      const { data } = await axios.get(
        "https://blogify-api-tawny.vercel.app/api/v1/posts"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const publicPostSlice = createSlice({
  name: "posts",
  initialState: InitialState,
  extraReducers: (builder) => {
    // fetch public post
    builder.addCase(fetchPublicPostsAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    // Rejected
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

//! Generate reducer
const postReducer = publicPostSlice.reducer;

export default postReducer;
