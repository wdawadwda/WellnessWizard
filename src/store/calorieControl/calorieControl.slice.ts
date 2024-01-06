import { createSlice } from "@reduxjs/toolkit";
import { type CalorieControlState } from "./calorieControl.type";
import { reducersCalorieControl } from "./calorieControl.reducers";

const initialState: CalorieControlState = {
  userId: null,
  settings: {
    totalCalories: null,
    amountOfWater: null,
  },
  selectedDate: null,
  waterDrunkIndex: null,
  dinner: null,
  lunch: null,
  breakfast: null,
  snack: null,
  activity: null,
};

export const calorieControlSlice = createSlice({
  name: "calorieControl",
  initialState,
  reducers: { ...reducersCalorieControl },
  extraReducers: () => {},
});

export const { actions: calorieControlActions } = calorieControlSlice;
