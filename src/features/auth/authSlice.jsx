import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (userData) => {
  const response = await axios.post(
    "http://real-estate-prod.ap-south-1.elasticbeanstalk.com/auth",
    userData,
    {
      withCredentials: true, // Include credentials
    }
  );
  return response.data;
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    "http://real-estate-prod.ap-south-1.elasticbeanstalk.com/logout",
    {
      withCredentials: true,
    }
  );
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
    id: null,
  },
  reducers: {
    logout: (state, action) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.id = null;
      state.status = "idle";
    },
    setCredentials: (state, action) => {
      const { user, token, id, error, status } = action.payload;
      state.user = user;
      state.token = token;
      state.id = id;
      state.error = error;
      state.status = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userName, accessToken, userId } = action.payload;
        state.user = userName;
        state.token = accessToken;
        state.id = userId;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logOut.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = null;
        state.user = null;
        state.error = null;
        state.id = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentId = (state) => state.auth.id;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
