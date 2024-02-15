import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  favorites: [],
  status: 'idle', 
  error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async (bookmarkId) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/favorites/${bookmarkId}`);
  console.log(response.data);

  return response.data;

});
// Slice
const favoritesSlice = createSlice({
    name: 'fav',
    initialState: {
      data: [],
      status: 'idle', 
      error: null
  
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(fetchFavorites.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  

// Export actions and reducer
export default favoritesSlice.reducer;
