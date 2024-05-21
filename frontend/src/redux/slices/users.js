import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (id) => {
    const {data} = await axios.get(`/users/${id}`);
    return data;
})

export const fetchUsersDelete = createAsyncThunk('users/fetchUsersDelete', async (id) => {
    const {data} = await axios.delete(`/users/${id}`);
    return data;
})


export const fetchUsersUpdate = createAsyncThunk(
    "users/fetchUsersUpdate",
    async ({ userId, params }, thunkAPI) => {
      try {
        const { data } = await axios.patch(
          `/users/${userId}`,
          params
        );
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

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
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        })
        .addCase(fetchUsersDelete.pending, (state, action) => {
            state.users.items = state.users.items.filter(
                (obj) => obj._id !== action.payload
            );
        })
        .addCase(fetchUsersUpdate.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
          .addCase(fetchUsersUpdate.fulfilled, (state, action) => {
            state.status = "loaded";
            state.items = action.payload;
        })
          .addCase(fetchUsersUpdate.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    },
})

export const usersReducer = usersSlice.reducer;