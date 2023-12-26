import { RootState } from "../store.types";

export const selectCalorieControl = (state: RootState) => state.calorieControl;

export const selectTotalCalories = (state: RootState) => state.calorieControl.settings.totalCalories;

export const selectAmountOfWater = (state: RootState) => state.calorieControl.settings.amountOfWater;

export const selectWaterDrunkIndex = (state: RootState) => state.calorieControl.waterDrunkIndex;
