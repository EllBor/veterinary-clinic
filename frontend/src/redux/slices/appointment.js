import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAppointment = createAsyncThunk("auth/fetchAppointment", async (userId) => {
  const { data } = await axios.post(`/users/${userId}/appointments`);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAppointment.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});


export const appointmentReducer = appointmentSlice.reducer;
