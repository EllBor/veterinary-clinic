import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPets = createAsyncThunk('pets/fetchPets', async (userId) => {
    const { data } = await axios.get(`/users/${userId}/pets`);
    return data;
});

const initialState = {
    pets: {
        items: [],
        status: 'loading',
    }
};

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchPets.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    },
})

export const petsReducer = petsSlice.reducer;