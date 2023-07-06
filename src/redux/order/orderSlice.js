import { createSlice } from '@reduxjs/toolkit';
import { addOrder, deleteOrder, getLastOrder } from './operations';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderedDish: [],
    lastOrder: null,
    orderError: null,
    orderLoading: false,
    isOrderAdded: false,
    isOrderDeleted: false,
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
        state.isOrderDeleted = false;
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
        state.orderError = action.payload.message;
      })
      // getLastOrder
      // deleteOrder
      .addCase(deleteOrder.pending, (state, action) => {
        state.orderLoading = true;
        state.isOrderDeleted = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.lastOrder = null;
        state.orderLoading = false;
        state.isOrderDeleted = true;
        state.isOrderAdded = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload.message;
        state.isOrderDeleted = false;
      });
    // deleteOrder
  },
});
export const orderReducer = orderSlice.reducer;

export const {
  addDish,
  decrementDishQuantity,
  incrementDishQuantity,
  addOrderError,
} = orderSlice.actions;
