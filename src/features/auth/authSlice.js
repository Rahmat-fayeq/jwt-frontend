import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginAPI, refreshTokens as refreshTokensAPI, logout as logoutAPI } from './authAPI';

export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    return await loginAPI(username, password);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const refreshTokens = createAsyncThunk('auth/refreshTokens', async (refreshToken, { rejectWithValue }) => {
  try {
    return await refreshTokensAPI(refreshToken);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutAPI();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.error = null;
      });
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
