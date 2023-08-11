import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/api/';
// axios.defaults.baseURL = 'http://it-food-backend.onrender.com/api/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verification = createAsyncThunk(
  'auth/verify',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/verify', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistToken = thunkAPI.getState().auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue('No valid token');
    }
    setAuthHeader(persistToken);
    try {
      const res = await axios.get('/users/current');

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (credentials, thunkAPI) => {
    try {
      await axios.post('/users/logout', credentials);
      clearAuthHeader();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/forgotpassword', credentials);
      return res.status;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
