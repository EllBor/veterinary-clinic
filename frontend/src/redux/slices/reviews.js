import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (id) => {
    const {data} = await axios.get(`/doctor/${id}/reviews`);
    return data;
})

export const fetchReviewsCreate = createAsyncThunk(
    "reviews/fetchReviewsCreate",
    async ({doctorId, userId, params }, thunkAPI) => {
      try {
        const { data } = await axios.post(`/doctor/${doctorId}/users/${userId}/reviews`, params);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

const initialState = {
    reviews: {
        items: [],
        status: 'loading',
    }
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchReviewsCreate.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchReviewsCreate.fulfilled, (state, action) => {
                state.status = "loaded";
                state.items = action.payload;
            })
            .addCase(fetchReviewsCreate.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
})

export const reviewsReducer = reviewsSlice.reducer;