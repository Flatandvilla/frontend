import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  // isAuth: false,
  token:null,
  id:null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // state.isAuth = action.payload.isAuth;
      state.user = action.payload;
      state.token = action.payload.token;
      state.id = action.payload.id; 

    },
    logOut: (state, action) => {
    //  state.isAuth = false;
      state.user = null;
      state.token = null;
      state.id = null;
    
    },
  },
});


export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
