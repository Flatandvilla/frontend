
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const deleteRank = createAsyncThunk(
  'ranks/deleteRank',
  async (query_id, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.authSlice.id;
    const token = state.authSlice.token;

    try {
      const url = `http://192.168.0.175:8002/api/delete-rank/${userId}/${query_id}/`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        return query_id; // Return the deleted query_id on success
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      console.error('Error in deleteRank thunk:', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



const deleteRankSlice = createSlice({
  name: 'rank',
  initialState: {
    ranks: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteRank.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRank.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ranks = state.ranks.filter((rank) => rank.query_id !== action.payload);
      })
      .addCase(deleteRank.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});



export default deleteRankSlice.reducer;
