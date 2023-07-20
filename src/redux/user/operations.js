import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const changeUserData = createAsyncThunk(
  'user/changeUserData',
  async (credentials, thunkAPI) => {
    const persistToken = thunkAPI.getState().auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('No valid token');
    }
    setAuthHeader(persistToken);

    try {
      const res = await axios.patch('/users/changeUserData', credentials, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFavoriteDishes = createAsyncThunk(
  'user/getFavoriteDishes',
  async (category, thunkAPI) => {
    try {
      const res = await axios.get(`/users/current/favorite`);
      console.log('res.data=', res);

      return { data: res.data, category };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
