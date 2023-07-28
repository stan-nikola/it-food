// import { createSlice } from '@reduxjs/toolkit';
// import {
//   addFavoriteDishes,
//   deleteFromFavoriteDishes,
// } from '../user/operations';

// import { ARRAY } from '../../components/DishCardRender/DishCardRender';

// export const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     arrayOfFavoriteID: [
//       '640cd5ac2d9fecf12e88985b',
//       '640cd5ac2d9fecf12e88981c',
//       '640cd5ac2d9fecf12e88988d',
//     ],
//   },

//   extraReducers: builder => {
//     // builder.addCase(addFavoriteDishes.pending, (state, action)) => { }

//     builder
//       .addCase(addFavoriteDishes.fulfilled, (state, action) => {
//         if (action.payload.data.newArrayOfFavorite) {
//           state.arrayOfFavoriteID = action.payload.data.newArrayOfFavorite;
//         }
//         console.log('arrayOfFavoriteID STATE-ADD= ', state.arrayOfFavoriteID);
//       })
//       .addCase(addFavoriteDishes.rejected, (state, action) => {
//         console.log('error');
//       })

//       //Delete
//       .addCase(deleteFromFavoriteDishes.fulfilled, (state, action) => {
//         if (action.payload.data.newArrayOfFavorite) {
//           state.arrayOfFavoriteID = action.payload.data.newArrayOfFavorite;
//         }
//         console.log('arrayOfFavoriteID STATE-DEL= ', state.arrayOfFavoriteID);
//       })
//       .addCase(deleteFromFavoriteDishes.rejected, (state, action) => {
//         console.log('error');
//       });
//   },
// });

// export const userReducer = userSlice.reducer;
