import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (id) => {
    const {data} = await axios.get(`/users/${id}`);
    return data;
})

const initialState = {
    users: {
        items: [],
        status: 'loading',
    }
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.items = action.payload;
            console.log("action.payload user",action.payload);
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        });
    },
})

export const usersReducer = usersSlice.reducer;