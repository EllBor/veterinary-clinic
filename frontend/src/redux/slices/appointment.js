import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAppointment = createAsyncThunk("auth/fetchAppointment", async (userId) => {
  const { data } = await axios.get(`/users/${userId}/appointments`);
  return data;
});

const initialState = {
  appointment: {
    items: [],
    status: 'loading',
  }
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});


export const appointmentReducer = appointmentSlice.reducer;
