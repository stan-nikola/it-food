import { createSlice } from '@reduxjs/toolkit';
import { addOrder, getLastOrder } from './operations';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderedDish: [],
    lastOrder: {},
    orderError: null,
    orderLoading: false,
    isOrderAdded: false,
  },
  reducers: {
    addDish(state, action) {
      state.orderedDish = [
        ...state.orderedDish,
        { _id: action.payload, quantity: 1 },
      ];
    },

    incrementDishQuantity(state, action) {
      state.orderedDish.forEach(item => {
        if (item._id === action.payload) {
          item.quantity += 1;
        }
      });
    },

    decrementDishQuantity(state, action) {
      state.orderedDish.forEach(item => {
        if (item._id === action.payload) {
          item.quantity -= 1;
        }
      });

      state.orderedDish = state.orderedDish.filter(item => item.quantity > 0);
    },
    addOrderError(state, action) {
      state.orderError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addOrder.pending, (state, action) => {
        state.orderError = null;
        state.isOrderAdded = false;
        state.orderLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orderError = null;
        state.isOrderAdded = true;
        state.orderLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderError = action.payload.message;
        state.orderLoading = false;
        state.isOrderAdded = false;
      })
      // getLastOrder
      .addCase(getLastOrder.pending, (state, action) => {
        state.isOrderAdded = false;
        state.orderLoading = true;
        state.lastOrder = null;
      })
      .addCase(getLastOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload;
        state.orderLoading = false;
      })
      .addCase(getLastOrder.rejected, (state, action) => {
        state.orderLoading = false;
      });
  },
});
export const orderReducer = orderSlice.reducer;

export const {
  addDish,
  decrementDishQuantity,
  incrementDishQuantity,
  addOrderError,
} = orderSlice.actions;
