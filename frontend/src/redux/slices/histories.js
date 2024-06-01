import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchMedicalHistory = createAsyncThunk('histories/fetchMedicalHistory', async (petId) => {
  const {data} = await axios.get(`/medical-history/${petId}`);
  console.log("data",data);
  return data;
})

export const fetchAnalysisResults = createAsyncThunk('histories/fetchAnalysisResults', async (petId) => {
  const {data} = await axios.get(`/pets/${petId}/result`);
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
      const data = action.payload || {};
      state.prescriptions = data.prescriptions || [];
      state.diagnosis = data.diagnosis || "";
      state.medicalCardNumber = data.medicalCardNumber || "";
    })
    .addCase(fetchMedicalHistory.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    })
    .addCase(fetchAnalysisResults.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchAnalysisResults.fulfilled, (state, action) => {
      state.status = "loaded";
      state.items = action.payload || [];
    })
    .addCase(fetchAnalysisResults.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const historiesReducer = historiesSlice.reducer;
