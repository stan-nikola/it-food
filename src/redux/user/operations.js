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

// Get favorite dishes
export const getFavoriteDishes = createAsyncThunk(
  'user/getFavoriteDishes',
  async (category, thunkAPI) => {
    try {
      const res = await axios.get(`/users/current/favorite`);
      // console.log('res.data(getFavoriteDishes) =', res.data);

      return { data: res.data, category: 'favorite' };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add to favorite dishes
export const addFavoriteDishes = createAsyncThunk(
  'user/addToFavoriteDishes',
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(`/users/current/add-to-favorite`, {
        newFavorite: id,
      });
      // console.log('RESdata = ', res.data);
      // console.log('RESdata.newArrayOfFavorite = ', res.data.newArrayOfFavorite);

      return { data: res.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete from favorite dishes
export const deleteFromFavoriteDishes = createAsyncThunk(
  'user/deleteFromFavoriteDishes',
  async (id, thunkAPI) => {
    try {
      // console.log('id for delete = ', id);
      const res = await axios.patch(`/users/current/delete-from-favorite`, {
        delFavorite: id,
      });
      return { data: res.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
