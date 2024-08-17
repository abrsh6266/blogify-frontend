import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import errorMsg from "../../components/alerts/ErrorMsg";
import successMsg from "../../components/alerts/SuccessMsg";

// Initial State
const InitialState = {
  loading: false,
  success: false,
  error: null,
  categories: {
    categories:[],
    message:null,
    status:null,
  },
  category: null,
};

//! categories Action

export const fetchCategoriesAction = createAsyncThunk(
  "categories/fetch-categories",
  async (payload, { rejectWithValue }) => {
    // Making request
    try {
      const { data } = await axios.get(
        "https://blogify-api-tawny.vercel.app/api/v1/categories"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: InitialState,
  extraReducers: (builder) => {
    // fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    // Fulfilled
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    // Rejected
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

//! Generate reducer
const categoryReducer = CategoriesSlice.reducer;

export default categoryReducer;
