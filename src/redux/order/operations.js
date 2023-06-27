import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/order', credentials);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getLastOrder = createAsyncThunk(
  'order/getLast',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/order/last', credentials);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
