import { combineReducers } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/theme.slice";
import { userSlice } from "./user/user.slice";
import { calorieControlSlice } from "./calorieControl/calorieControl.slice";
import { calorieControlSavedSlice } from "./calorieControlSaved/calorieControlSaved.slice";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [calorieControlSlice.name]: calorieControlSlice.reducer,
  [calorieControlSavedSlice.name]: calorieControlSavedSlice.reducer,
});
