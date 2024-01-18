// queryDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define the asynchronous action using createAsyncThunk
export const fetchQueryDetails = createAsyncThunk('queryDetails/fetchQueryDetails', 
async ({ userId, query, targetUrl }) => {
  try {
    const response = await axios.get(`http://192.168.0.175:8002/api/display-ranks/${userId}/${query}/${targetUrl}/`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching query details:', error);
    throw error;
  }
});

