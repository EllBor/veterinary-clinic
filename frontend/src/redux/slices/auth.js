import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  console.log(data);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchCheckPhoneAnswer = createAsyncThunk(
  "auth/fetchCheckPhoneAnswer",
  async (params) => {
    const { data } = await axios.post(`/check-user-by-phone-answer`, params);
    return data;
  }
);

export const fetchResetPassword = createAsyncThunk(
  "auth/ResetPassword",
  async (params) => {
    const { data } = await axios.post(`/auth/password-reset`, params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
        state.id = action.payload._id;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchCheckPhoneAnswer.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchCheckPhoneAnswer.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchCheckPhoneAnswer.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.status = "loaded";
        state.items = action.payload;
      })
      .addCase(fetchResetPassword.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const selectIsAuthId = (state) => state.auth.id;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
