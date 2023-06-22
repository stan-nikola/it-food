import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderedDish: [],
  },
  reducers: {
    addDish(state, action) {
      state.orderedDish = [
        ...state.orderedDish,
        { id: action.payload, quantity: 1 },
      ];
    },

    incrementDishQuantity(state, action) {
      state.orderedDish.forEach(item => {
        if (item.id === action.payload) {
          item.quantity += 1;
        }
      });
    },

    decrementDishQuantity(state, action) {
      state.orderedDish.forEach(item => {
        if (item.id === action.payload) {
          item.quantity -= 1;
        }
      });

      state.orderedDish = state.orderedDish.filter(item => item.quantity > 0);
    },
  },
});
export const orderReducer = orderSlice.reducer;

export const { addDish, decrementDishQuantity, incrementDishQuantity } =
  orderSlice.actions;
