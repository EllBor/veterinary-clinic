import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchMedicalHistory = createAsyncThunk('histories/fetchMedicalHistory', async (petId) => {
  const {data} = await axios.get(`/medical-history/${petId}`);
  return data;
})

const initialState = {
  prescriptions: [],
  diagnosis: "",
  medicalCardNumber: "",
    histories: {
      items: [],
      status: "loading",
  },
};

const historiesSlice = createSlice({
  name: "histories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMedicalHistory.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchMedicalHistory.fulfilled, (state, action) => {
      state.status = "loaded";
      state.prescriptions= action.payload.prescriptions;
      state.diagnosis = action.payload.diagnosis;
      state.medicalCardNumber = action.payload.medicalCardNumber;
    })
    .addCase(fetchMedicalHistory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const historiesReducer = historiesSlice.reducer;
