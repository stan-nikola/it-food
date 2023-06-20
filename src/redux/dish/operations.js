import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDishesByCategory = createAsyncThunk(
  'dish/getByCategory',
  async (category, thunkAPI) => {
    try {
      const res = await axios.get(`/dishes${category}`);

      return { data: res.data, category };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
