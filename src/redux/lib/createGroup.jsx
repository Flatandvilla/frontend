// bookmarksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  bookmarks: [],
  status: 'idle',
  error: null,
};

export const createBookmark = createAsyncThunk(
  'bookmarks/createBookmark',
  async (bookmarkData, {getState, rejectWithValue }) => {
    const state = getState();
      const id = state.authSlice.id;
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bookmarks/${id}/`, bookmarkData);
        // console.log(response.data)
      return response.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBookmark.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookmarks.push(action.payload); // Add the new bookmark to the state
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookmarksSlice.reducer;
