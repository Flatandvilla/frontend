// features/sidebar/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle_Bookmark: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle_Bookmark } = SidebarSlice.actions;

export default SidebarSlice.reducer;
