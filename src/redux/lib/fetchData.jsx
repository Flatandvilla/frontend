import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const id = state.authSlice.id;
    const token = state.authSlice.token;

    try {
      const response = await axios.get(`http://192.168.0.175:8002/api/userRank/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  
const tableSlice = createSlice({
  name: 'table',
  initialState: {
    data: [],
    status: 'idle', 
    error: null

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;