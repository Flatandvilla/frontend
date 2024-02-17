// features/bookmarks/bookmarkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBookmarks } from './displayBookmarks';

export const fetchQueriesByBookmark = createAsyncThunk(
  'bookmarks/fetchQueries',
  async (bookmarkId, thunkAPI) => {
    const response = await fetchBookmarks(bookmarkId);
    return response.data;
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    selectedBookmarkId: null,
    queries: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setSelectedBookmarkId(state, action) {
      state.selectedBookmarkId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueriesByBookmark.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchQueriesByBookmark.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.queries = action.payload;
      })
      .addCase(fetchQueriesByBookmark.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedBookmarkId } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;

export const selectSelectedBookmarkId = (state) => state.bookmarks.selectedBookmarkId;
export const selectQueries = (state) => state.bookmarks.queries;
export const selectQueriesStatus = (state) => state.bookmarks.status;
export const selectQueriesError = (state) => state.bookmarks.error;
