
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addsingleKeyword = createAsyncThunk(
  'keywords/addsingleKeyword',
  async (keywordData, { getState, rejectWithValue }) => {
    const state = getState();
    const id = state.authSlice.id;
    const token = state.authSlice.token;
    try {
      const response = await axios.post(
        `http://192.168.0.175:8002/api/add-rank-single/${id}/`,
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

export const keywordsingleSlice = createSlice({
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
      .addCase(addsingleKeyword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addsingleKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload); 
        



       
      })
      .addCase(addsingleKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addKeywordSuccess } = keywordsingleSlice.actions;

export default keywordsingleSlice.reducer;
