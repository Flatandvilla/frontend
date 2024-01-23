// keywordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for handling the API request
export const fetchUrlData = createAsyncThunk(
  'url/fetchUrlData',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/keyword/process_url/1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(urlData)
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

const UrlSlice = createSlice({
  name: 'Url',
  initialState: {
    data: null,
  
  },
  reducers: {},
  extraReducers: {
    [fetchUrlData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUrlData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchUrlData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }, 
});

export default UrlSlice.reducer;
