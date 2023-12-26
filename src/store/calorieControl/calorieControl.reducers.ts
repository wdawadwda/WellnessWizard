import { type PayloadAction } from "@reduxjs/toolkit";
import { type CalorieControlState } from "./calorieControl.type";
import { type Activity, type Product } from "../../entities/type/analyzers/calorieAnalyzer.type";

export const reducersCalorieControl = {
  setTotalCalories: (state: CalorieControlState, action: PayloadAction<number>) => {
    state.settings.totalCalories = action.payload;
  },
  setAmountOfWater: (state: CalorieControlState, action: PayloadAction<number>) => {
    state.settings.amountOfWater = action.payload;
  },
  setSelectedDate: (state: CalorieControlState, action: PayloadAction<string>) => {
    state.selectedDate = action.payload;
  },
  setWaterDrunkIndex: (state: CalorieControlState, action: PayloadAction<number>) => {
    state.waterDrunkIndex = action.payload;
  },
  setBreakfast: (state: CalorieControlState, action: PayloadAction<Product[]>) => {
    state.breakfast = Array.isArray(state.breakfast) ? [...state.breakfast, ...action.payload] : action.payload;
  },
  setLunch: (state: CalorieControlState, action: PayloadAction<Product[]>) => {
    state.lunch = Array.isArray(state.lunch) ? [...state.lunch, ...action.payload] : action.payload;
  },
  setDinner: (state: CalorieControlState, action: PayloadAction<Product[]>) => {
    state.dinner = Array.isArray(state.dinner) ? [...state.dinner, ...action.payload] : action.payload;
  },
  setSnack: (state: CalorieControlState, action: PayloadAction<Product[]>) => {
    state.snack = Array.isArray(state.snack) ? [...state.snack, ...action.payload] : action.payload;
  },
  setActivity: (state: CalorieControlState, action: PayloadAction<Activity[]>) => {
    state.activity = Array.isArray(state.activity) ? [...state.activity, ...action.payload] : action.payload;
  },
  setUserId: (state: CalorieControlState, action: PayloadAction<number>) => {
    state.userId = action.payload;
  },
};
