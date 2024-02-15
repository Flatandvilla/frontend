
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./lib/auth";
import tableSlice from "./lib/fetchData";
import  keywordSlice  from "./lib/keyword";
import deleteRankSlice from './lib/deleteRow';
import updateRankSlice from './lib/updateRow'
import displayBookmarkSlice from "./lib/displayBookmarks";
import createBookmarkSlice from "./lib/createGroup";
import SidebarSlice from './lib/SidebarSlice';
import ModalSlice from './lib/modalSlice';
import UrlSlice from './lib/urlSearch';
import querySlice from './lib/querySlice'
import keywordsingleSlice from './lib/singlekeyword';
import dataSlice from "./lib/dataSlice";
import quoriesSlice from "./lib/quoriesSlice"
import favoritesSlice from "./lib/favSlice"
const rootReducer = combineReducers({
  authSlice,
  tableSlice,
  keywordSlice,
  deleteRankSlice,
  updateRankSlice,
  displayBookmarkSlice,
  createBookmarkSlice,
  SidebarSlice,
  ModalSlice,
  UrlSlice,
  querySlice,
  keywordsingleSlice,
  dataSlice,
  quoriesSlice,
  favoritesSlice,
});


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
