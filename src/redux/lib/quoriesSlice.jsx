import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you're using axios for API calls
export const fetchQueries = createAsyncThunk(
    'data/fetchQueries',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const id = state.authSlice.id;
      const token = state.authSlice.token;
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userRank/${id}/`, {
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
  
const quoriesSlice = createSlice({
  name: 'queries',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQueries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchQueries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoriesSlice.reducer;

export const selectLastFiveQueries = (state) => {
    // Ensure the path to your queries items array is correct
    console.log(state.tableSlice)
    const queriesItems = state.tableSlice.data;
    console.log(queriesItems)
  
    
    if (!queriesItems) {
      console.error("Queries items are undefined in the state structure");
      return [];
    }
  
    // Sort queries by date, similar to your useEffect logic
    const sortedByDate = [...queriesItems].sort((a, b) => new Date(b.date) - new Date(a.date));
  
    // Return the first 5 items from the sorted array
    return sortedByDate.slice(0, 5);
  };

  export const selectMostCommonTargetUrl = (state) => {
    const queriesItems = state.tableSlice.data;
  
    if (!queriesItems || queriesItems.length === 0) {
      console.error("Queries items are empty or undefined in the state structure");
      return '';
    }
  
    const urlCountMap = queriesItems.reduce((acc, query) => {
      const url = query.target_url;
      if (url in acc) {
        acc[url] += 1;
      } else {
        acc[url] = 1;
      }
      return acc;
    }, {});
  
    // Find the URL with the maximum count
    const mostCommonUrl = Object.keys(urlCountMap).reduce((a, b) => urlCountMap[a] > urlCountMap[b] ? a : b, '');
  
    return mostCommonUrl;
  };


 