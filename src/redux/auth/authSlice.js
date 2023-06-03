import { createSlice } from '@reduxjs/toolkit';
import { signUp, verification } from './operations';
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
        console.log(action.payload);
        state.token = action.payload.token;
        state.user.name = action.payload.name;
        state.user.phone = action.payload.phone;
        state.user.email = action.payload.email;
        state.user.avatarUrl = action.payload.avatarUrl;

        state.isLoading = false;
      })
      .addCase(verification.rejected, (state, action) => {
        // state.isLoggedInLoading = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'rememberUser'],
};

export const authPresistedReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const { rememberUser, authError } = authSlice.actions;
