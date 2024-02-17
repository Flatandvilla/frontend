// bookmarksSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bookmarks: [],
  status: 'idle',
  error: null,
};



export const fetchBookmarks = createAsyncThunk(
    'bookmarks/fetchBookmarks',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const id = state.authSlice.id;
      const token = state.authSlice.token;
      
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Displaybookmarks/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)

        return response.data;
      } catch (error) {
        return rejectWithValue(error.message); // Handle errors using rejectWithValue
      }
    }
  );

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookmarksSlice.reducer;
