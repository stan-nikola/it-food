import { createSlice } from '@reduxjs/toolkit';
import { getDishesByCategory } from './operations';

export const dishSlice = createSlice({
  name: 'dish',
  initialState: {
    collections: { main: [], meat: [], dessert: [] },
    isDishLoaded: false,
  },

  extraReducers: builder => {
    builder
      .addCase(getDishesByCategory.pending, (state, action) => {
        state.isDishLoaded = true;
      })
      .addCase(getDishesByCategory.fulfilled, (state, action) => {
        const category = action.payload.category;

        switch (category) {
          case 'main':
            state.collections.main = action.payload.data;
            break;
          case 'meat':
            state.collections.meat = action.payload.data;
            break;
          case 'dessert':
            state.collections.dessert = action.payload.data;
            break;

          default:
            state.main = action.payload.data;
        }

        state.isDishLoaded = false;
      })
      .addCase(getDishesByCategory.rejected, (state, action) => {
        state.isDishLoaded = false;
      });
  },
});

export const dishReducer = dishSlice.reducer;
