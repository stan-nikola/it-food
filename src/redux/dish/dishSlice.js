import { createSlice } from '@reduxjs/toolkit';
import { getDishesByCategory } from './operations';
import { getFavoriteDishes } from '../user/operations';

export const dishSlice = createSlice({
  name: 'dish',
  initialState: {
    collections: { main: [], meat: [], dessert: [], favorite: [] },
    isDishLoaded: false,
  },

  reducers: {
    eraseFavorite(state, action) {
      state.collections.favorite = [];
    },
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
      })

      // Get favorite dishes
      .addCase(getFavoriteDishes.pending, (state, action) => {
        state.isDishLoaded = true;
      })
      .addCase(getFavoriteDishes.fulfilled, (state, action) => {
        const category = action.payload.category;

        switch (category) {
          case 'favorite':
            state.collections.favorite = action.payload.data;
            // console.log(
            //   'state.collections.favorite =',
            //   state.collections.favorite
            // );
            break;

          default:
            state.main = action.payload.data;
        }

        state.isDishLoaded = false;
      })
      .addCase(getFavoriteDishes.rejected, (state, action) => {
        state.isDishLoaded = false;
      });
  },
});

export const dishReducer = dishSlice.reducer;
export const { eraseFavorite } = dishSlice.actions;
