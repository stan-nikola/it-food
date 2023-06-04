import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, signUp, verification } from './operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null, phone: null, avatarUrl: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    verify: false,
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.user.email = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
      })
      // register

      // verify
      .addCase(verification.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verification.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl } = action.payload;

        state.user = { name, phone, email, avatarUrl };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(verification.rejected, (state, action) => {
        state.isLoggedInLoading = false;
      })
      // refresh
      .addCase(refreshUser.pending, (state, action) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl } = action.payload;
        state.user = { name, phone, email, avatarUrl };
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
      // logIn
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl } = action.payload;
        state.user = { name, phone, email, avatarUrl };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
      // logOut
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.token = null;
        state.user = { name: null, phone: null, email: null, avatarUrl: null };
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const authPresistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const { rememberUser, authError } = authSlice.actions;
