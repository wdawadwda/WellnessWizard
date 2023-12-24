import { combineReducers } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/theme.slice";
import { userSlice } from "./user/user.slice";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
