import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
    const {data} = await axios.get('/doctor');
    return data;
})

export const fetchOneDoctor = createAsyncThunk('doctors/fetchOneDoctor', async (id) => {
    const {data} = await axios.get(`/doctor/${id}`);
    return data;
})

export const fetchDoctorAppointments = createAsyncThunk('doctors/fetchDoctorAppointments', async (id) => {
    const {data} = await axios.get(`/doctor/${id}/appointments`);
    console.log(data);
    return data;
})

const initialState = {
    doctors: {
        items: [],
        status: 'loading',
    }
};

const doctorsSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchOneDoctor.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOneDoctor.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchOneDoctor.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchDoctorAppointments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.nearestAppointment = action.payload.nearestAppointment;
            })
            .addCase(fetchDoctorAppointments.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    },
})

export const doctorsReducer = doctorsSlice.reducer;