import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReceipt = createAsyncThunk("receipt/fetchReceipt", async (userId) => {
  const { data } = await axios.get(`/users/${userId}/receipt`);
  return data;
});

export const fetchReceiptCreate = createAsyncThunk(
  "receipt/fetchReceiptCreate",
  async ({ userId, params }, thunkAPI) => {
    try {
      console.log("userId",userId, params);
      const { data } = await axios.post(`/users/${userId}/receipt`, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    receipt: {
      items: [],
      status: "loading",
    },
  };
  
  const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReceipt.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetchReceipt.fulfilled, (state, action) => {
          state.status = "loaded";
          state.items = action.payload;
        })
        .addCase(fetchReceipt.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        })
        .addCase(fetchReceiptCreate.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetchReceiptCreate.fulfilled, (state, action) => {
          state.status = "loaded";
          state.items = action.payload;
        })
        .addCase(fetchReceiptCreate.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        });
    },
  });
  
  export const receiptReducer = receiptSlice.reducer;