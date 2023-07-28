import { createSlice } from '@reduxjs/toolkit';
import {
  forgotPassword,
  logIn,
  logOut,
  refreshUser,
  signUp,
  verification,
} from './operations';
import {
  addFavoriteDishes,
  deleteFromFavoriteDishes,
} from '../user/operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { changeUserData } from 'redux/user/operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      phone: null,
      avatarUrl: null,
      giftCoin: 0,
      favorite: [],
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    isError: null,
  },
  reducers: {
    error(state, action) {
      state.isError = action.payload;
    },
    setPhone(state, action) {
      state.user.phone = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.user.email = null;
        state.isError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isError = action.payload.message;
        state.isLoading = false;
      })
      // register

      // verify
      .addCase(verification.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(verification.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl, giftCoin, favorite } =
          action.payload;

        state.user = { name, phone, email, avatarUrl, giftCoin, favorite };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(verification.rejected, (state, action) => {
        state.isError = action.payload.message;
        state.isLoading = false;
      })
      // refresh
      .addCase(refreshUser.pending, (state, action) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl, giftCoin, favorite } =
          action.payload;
        state.user = { name, phone, email, avatarUrl, giftCoin, favorite };
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
        state.isError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { name, phone, email, avatarUrl, giftCoin, favorite } =
          action.payload;
        state.user = { name, phone, email, avatarUrl, giftCoin, favorite };
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isRefreshing = false;
        state.isError = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isError = action.payload;
      })
      // logOut
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.token = null;
        state.user = {
          name: null,
          phone: null,
          email: null,
          avatarUrl: null,
          giftCoin: 0,
          favorite: [],
        };
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
      })
      // logOut

      // forgotPass
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;

        state.isError = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })
      // forgotPass

      // changeUserData
      .addCase(changeUserData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(changeUserData.fulfilled, (state, action) => {
        state.isLoading = false;

        const { name, phone, avatarUrl } = action.payload;
        state.user = { ...state.user, name, phone, avatarUrl };
      })
      .addCase(changeUserData.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      })
      // changeUserData

      // addFavoriteDishes
      .addCase(addFavoriteDishes.fulfilled, (state, action) => {
        if (action.payload.data.newArrayOfFavorite) {
          state.user.favorite = action.payload.data.newArrayOfFavorite;
        }
        // console.log('arrayOfFavoriteID STATE-ADD= ', state.user.favorite);
      })
      .addCase(addFavoriteDishes.rejected, (state, action) => {
        console.log('error');
      })
      // addFavoriteDishes

      // deleteFromFavoriteDishes
      .addCase(deleteFromFavoriteDishes.fulfilled, (state, action) => {
        if (action.payload.data.newArrayOfFavorite) {
          state.user.favorite = action.payload.data.newArrayOfFavorite;
        }
        // console.log('arrayOfFavoriteID STATE-DEL= ', state.user.favorite);
      })
      .addCase(deleteFromFavoriteDishes.rejected, (state, action) => {
        console.log('error');
      });
    // deleteFromFavoriteDishes
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

export const { error, setPhone } = authSlice.actions;
