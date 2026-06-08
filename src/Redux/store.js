import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import blogSlice from "./blogSlice";
import themeSlice from "./themeSlice";
import commentSlice from "./commentSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  blog: blogSlice,
  comment: commentSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;