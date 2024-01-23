// keywordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const processKeyword = createAsyncThunk(
  'keyword/processKeyword',
  async (keywordData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/keyword/process_query/1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(keywordData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const querySlice = createSlice({
  name: 'keyword',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [processKeyword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [processKeyword.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [processKeyword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default querySlice.reducer;
