import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPets = createAsyncThunk("pets/fetchPets", async (userId) => {
  const { data } = await axios.get(`/users/${userId}/pets`);
  return data;
});

export const fetchPetsDelete = createAsyncThunk(
  "pets/fetchPetsDelete",
  async ({ userId, petId }) => {
    await axios.delete(`/users/${userId}/pets/${petId}`);
  }
);

export const fetchPetsUpdate = createAsyncThunk(
  "pets/fetchPetsUpdate",
  async ({ userId, petId, params }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/users/${userId}/pets/${petId}`,
        params
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchPetsCreate = createAsyncThunk(
  "pets/fetchPetsCreate",
  async ({ userId, params }, thunkAPI) => {
    try {
      const { data } = await axios.post(`/users/${userId}/pets`, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  pets: {
    items: [],
    status: "loading",
  },
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchPetsCreate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPetsCreate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchPetsCreate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchPetsDelete.pending, (state, action) => {
        state.pets.items = state.pets.items.filter(
          (obj) => obj._id !== action.payload
        );
      })
      .addCase(fetchPetsUpdate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPetsUpdate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchPetsUpdate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const petsReducer = petsSlice.reducer;
