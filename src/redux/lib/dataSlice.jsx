// dataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keywordResults: [],
    urlResults: [],
    lastSubmissionType: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addKeywordResult: (state, action) => {
            state.keywordResults.push(action.payload);
        },
        addUrlResult: (state, action) => {
            state.urlResults.push(action.payload);
        },
        setLastSubmissionType: (state, action) => {
            state.lastSubmissionType = action.payload;
        },
    },
});

export const { addKeywordResult, addUrlResult, setLastSubmissionType } = dataSlice.actions;

export default dataSlice.reducer;
