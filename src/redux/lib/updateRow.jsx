import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateRank = createAsyncThunk(
  'ranks/updateRank',
  async ({ query, targetUrl }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.authSlice.id;
      const token = state.authSlice.token;

      const url = `http://192.168.0.175:8002/api/update-rank/${userId}/${query}/${targetUrl}/`;

      const response = await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; 

    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const updateRankSlice = createSlice({
  name: 'rank',
  initialState: {
    ranks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // You can define other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRank.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRank.fulfilled, (state, action) => {
        state.ranks = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateRank.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default updateRankSlice.reducer;
