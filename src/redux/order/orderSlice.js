import { createSlice } from '@reduxjs/toolkit';
import {
  addOrder,
  confirmOrder,
  deleteOrder,
  getLastOrder,
  getOrderById,
  getUserOrder,
} from './operations';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderedDish: [],
    lastOrder: null,
    orderError: null,
    orderLoading: false,
    isOrderAdded: false,
    userOrder: [],
  },
  reducers: {
    addDish(state, action) {
      const isDishInList = state.orderedDish.some(
        item => item.id === action.payload
      );

      if (state.orderedDish.length > 0) {
        if (isDishInList) {
          state.orderedDish = [...state.orderedDish];
        } else {
          state.orderedDish = [
            ...state.orderedDish,
            { id: action.payload, quantity: 1 },
          ];
        }
      } else {
        state.orderedDish = [{ id: action.payload, quantity: 1 }];
      }
    },
    deleteAllDishes(state, action) {
      state.orderedDish = [];
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
        state.lastOrder = action.payload;

        state.orderLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.orderError = action.payload.message;
        state.orderLoading = false;
        state.isOrderAdded = false;
      })
      // getLastOrder
      .addCase(getLastOrder.pending, (state, action) => {
        state.orderLoading = true;

        state.isOrderAdded = false;
      })
      .addCase(getLastOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload;
        state.orderLoading = false;
      })
      .addCase(getLastOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
      })
      // getLastOrder

      // getOrderById
      .addCase(getOrderById.pending, (state, action) => {
        state.orderLoading = true;
        state.isOrderAdded = false;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.lastOrder = action.payload;
        state.orderLoading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
      })
      // getOrderById

      // deleteOrder
      .addCase(deleteOrder.pending, (state, action) => {
        state.orderLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.lastOrder = null;
        state.orderLoading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
      })
      // deleteOrder
      // confirmOrder
      .addCase(confirmOrder.pending, (state, action) => {
        state.orderLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.lastOrder = null;
        state.orderLoading = false;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
      })
      // confirmOrder

      // getUserOrder
      .addCase(getUserOrder.pending, (state, action) => {
        state.orderLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.userOrder = action.payload;
        state.orderLoading = false;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
      });
    // getLastOrder
  },
});
export const orderReducer = orderSlice.reducer;

export const {
  addDish,
  deleteAllDishes,
  decrementDishQuantity,
  incrementDishQuantity,
  addOrderError,
} = orderSlice.actions;
