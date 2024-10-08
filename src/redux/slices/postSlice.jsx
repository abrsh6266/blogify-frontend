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
    posts: [],
    message: null,
    status: null,
    pagination: {},
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
        "https://blogify-api-tawny.vercel.app/api/v1/posts/public"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! private posts Action

export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (payload, { rejectWithValue }) => {
    // Making request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "https://blogify-api-tawny.vercel.app/api/v1/posts",
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! single post Action

export const fetchSinglePostAction = createAsyncThunk(
  "posts/fetch-single-posts",
  async (postId, { rejectWithValue }) => {
    // Making request
    try {
      const { data } = await axios.get(
        `https://blogify-api-tawny.vercel.app/api/v1/posts/${postId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! Add Post Action

export const addPostAction = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, getState }) => {
    // Making request
    try {
      console.log(payload);
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("categoryId", payload?.category);
      formData.append("content", payload?.content);
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "https://blogify-api-tawny.vercel.app/api/v1/posts",
        formData,
        config
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
    // fetch single post
    builder.addCase(fetchSinglePostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(fetchSinglePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    // Rejected
    builder.addCase(fetchSinglePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    // create Post
    builder.addCase(addPostAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
      successMsg(state.post.message);
    });
    // Rejected
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
      errorMsg(state.error.message);
    });

    // fetch private post
    builder.addCase(fetchPrivatePostsAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    // Rejected
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.loading = false;
      state.posts.posts = [];
      state.success = false;
      state.error = action.payload;
    });
  },
});

//! Generate reducer
const postReducer = publicPostSlice.reducer;

export default postReducer;
