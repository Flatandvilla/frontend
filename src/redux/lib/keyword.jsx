
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addKeyword = createAsyncThunk(
  'keywords/addKeyword',
  async (keywordData, { getState, rejectWithValue }) => {
    const state = getState();
    const id = state.authSlice.id;
    const token = state.authSlice.token;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/add-rank/${id}/`,
        keywordData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const keywordSlice = createSlice({
  name: 'keywords',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
 
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(addKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); 
        



        // state.loading = false;
        // // Create a new entry with the returned data and the current date
        // const newEntry = {
        //   ...action.payload, // The data returned from the server
        //   date: new Date().toISOString() // Add the current date to the new entry
        // };
        // state.data.push(newEntry);
      })
      .addCase(addKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addKeywordSuccess } = keywordSlice.actions;

export default keywordSlice.reducer;
