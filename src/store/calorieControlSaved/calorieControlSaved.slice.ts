import { createSlice } from "@reduxjs/toolkit";
import { type CalorieControlState } from "./calorieControlSaved.type";

const initialState: CalorieControlState = {
  data: {
    "2024-01-08": {
      userId: 5,
      settings: { totalCalories: 1700, amountOfWater: 7 },
      selectedDate: "2024-01-08",
      waterDrunkIndex: 3,
      dinner: null,
      lunch: null,
      breakfast: [{ product: "Bread, rye", weight: 100, protein: 8.5, fat: 3.3, carbs: 48.3, calories: 259 }],
      snack: null,
      activity: null,
    },
    "2024-01-09": {
      userId: 5,
      settings: { totalCalories: 1500, amountOfWater: 7 },
      selectedDate: "2024-01-08",
      waterDrunkIndex: 3,
      dinner: null,
      lunch: null,
      breakfast: [{ product: "Bread, rye", weight: 100, protein: 8.5, fat: 3.3, carbs: 48.3, calories: 259 }],
      snack: null,
      activity: null,
    },
  },
  status: "idle",
};

export const calorieControlSavedSlice = createSlice({
  name: "calorieControlSaved",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const { actions: calorieControlSavedActions } = calorieControlSavedSlice;
