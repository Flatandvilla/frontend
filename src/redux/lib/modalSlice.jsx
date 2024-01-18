import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpenn: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModall(state) {
      state.isModalOpenn = true;
    },
    closeModall(state) {
      state.isModalOpenn = false;
    },
  },
});

export const { openModall, closeModall } = modalSlice.actions;

export default modalSlice.reducer;
