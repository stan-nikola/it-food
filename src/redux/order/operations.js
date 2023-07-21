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

export const getByIdAndPhone = createAsyncThunk(
  'order/getByIdAndPhone',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/order/byPhone', credentials);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/order/delete', credentials);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  'order/confirm',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.patch('/order/confirm', credentials);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserOrder = createAsyncThunk(
  'order/getUserOrder',
  async (page, thunkAPI) => {
    try {
      if (!page) return [];
      const res = await axios.get(`/order/history?page=${page}`);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getOrderById = createAsyncThunk(
  'order/getById',
  async ({ orderId }, thunkAPI) => {
    try {
      const res = await axios.get(`/order/${orderId}`);

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
