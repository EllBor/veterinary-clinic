import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const {data} = await axios.get('/reviews');
    return data;
})

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
            });
    },
})

export const reviewsReducer = reviewsSlice.reducer;