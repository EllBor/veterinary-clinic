import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const {data} = await axios.get('/services');
    return data;
})

export const fetchOneService = createAsyncThunk('services/fetchOneService', async (slug) => {
    const {data} = await axios.get(`/services/${slug}`);
    return data;
})

export const fetchDoctorsByService = createAsyncThunk('services/fetchDoctorsByService', async (id) => {
    const {data} = await axios.get(`/doctor/services/${id}`);
    return data;
})


const initialState = {
    diagnostics: [],
    doctor: [],
    services: {
        items: [],
        status: 'loading',
    }
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.items = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchOneService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOneService.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.diagnostics = action.payload.diagnostics;
                state.services.items = action.payload;
            })
            .addCase(fetchOneService.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(fetchDoctorsByService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDoctorsByService.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.doctor = action.payload;
            })
            .addCase(fetchDoctorsByService.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    },
})

export const servicesReducer = servicesSlice.reducer;