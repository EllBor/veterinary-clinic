import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAppointment = createAsyncThunk("auth/fetchAppointment", async (userId) => {
  const { data } = await axios.get(`/users/${userId}/appointments`);
  return data;
});

export const fetchAppointmentDelete = createAsyncThunk(
  "auth/fetchAppointmentDelete",
  async ({ userId, appointmentId }) => {
    await axios.delete(`/users/${userId}/appointments/${appointmentId}`);
  }
);

export const fetchAppointmentCreate = createAsyncThunk(
  "auth/fetchAppointmentCreate ",
  async ({ userId, doctorId, petId, params }, thunkAPI) => {
    try {
      const { data } = await axios.post(`appointments/users/${userId}/doctors/${doctorId}/pets/${petId}`, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(fetchAppointmentDelete.pending, (state, action) => {
        state.appointment.items = state.appointment.items.filter(
          (obj) => obj._id !== action.payload
        );
      })
      .addCase(fetchAppointmentCreate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAppointmentCreate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchAppointmentCreate.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const appointmentReducer = appointmentSlice.reducer;