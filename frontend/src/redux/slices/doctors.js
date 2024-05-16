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
    return data;
})

export const fetchDoctorServiceAppointments = createAsyncThunk('doctors/fetchDoctorServiceAppointments', async ({serviceId, id}) => {
    const {data} = await axios.get(`/service/${serviceId}/doctor/${id}/appointments`);
    console.log("data",data);
    return data;
})

export const fetchDoctorsWithAppointments = createAsyncThunk('doctors/fetchDoctorsWithAppointments', async (id) => {
    const {data} = await axios.get(`/service/${id}/doctors`);
    return data;
})

export const fetchUpdateAppointmentStatus = createAsyncThunk('doctors/fetchUpdateAppointmentStatus', async ({serviceId, doctorId, params}) => {
    const {data} = await axios.post(`/service/${serviceId}/doctors/${doctorId}/appointments`, params);
    return data;
})


const initialState = {
    doctorsWithAppointments: [],
    nearestAppointment: [],
    sortedAppointments: [],
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
            })
            .addCase(fetchDoctorsWithAppointments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctorsWithAppointments.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.doctorsWithAppointments = action.payload.doctorsWithAppointments;
                console.log("doctorsWithAppointments", state.doctorsWithAppointments);
            })
            .addCase(fetchDoctorsWithAppointments.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchDoctorServiceAppointments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctorServiceAppointments.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.sortedAppointments = action.payload.sortedAppointments;
            })
            .addCase(fetchDoctorServiceAppointments.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchUpdateAppointmentStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUpdateAppointmentStatus.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchUpdateAppointmentStatus.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    },
})

export const doctorsReducer = doctorsSlice.reducer;