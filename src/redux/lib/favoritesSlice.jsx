// features/favorites/favoritesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (bookmarkId, { getState }) => {
    const userId = getState().authSlice.user.id;
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/DisplayFavos/${userId}/${bookmarkId}/`);
    console.log(response.data)
    return response.data;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    resetFavorites: (state) => {
      state.favorites = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;

// Selector to get the state
export const selectFavorites = (state) => state.favorites.favorites;
export const selectFavoritesStatus = (state) => state.favorites.status;
export const selectFavoritesError = (state) => state.favorites.error;
// Existing exports
export const { resetFavorites } = favoritesSlice.actions; // Add this line


