import { createSlice } from "@reduxjs/toolkit";
import { type CalorieControlState } from "./calorieControl.type";

const initialState: CalorieControlState = {
  settings: {
    totalCalories: null,
    amountOfWater: null,
  },
  selectedDate: null,
  waterDrunkIndex: null,
};

export const calorieControlSlice = createSlice({
  name: "calorieControl",
  initialState,
  reducers: {
    setTotalCalories: (state, action) => {
      state.settings.totalCalories = action.payload;
    },
    setAmountOfWater: (state, action) => {
      state.settings.amountOfWater = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setWaterDrunkIndex: (state, action) => {
      state.waterDrunkIndex = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { actions: calorieControlActions } = calorieControlSlice;
