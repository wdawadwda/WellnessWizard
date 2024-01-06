import { createListenerMiddleware } from "@reduxjs/toolkit";
import { calorieControlActions } from "./calorieControl.slice";
import { store } from "../store";
import axios from "axios";
import { BASE_URL } from "../../entities/const/api/urls";
import { updateCalorieControl } from "../api/calorieControl";

export const listenerMiddlewareCalorieControl = createListenerMiddleware();

listenerMiddlewareCalorieControl.startListening({
  predicate: (action) => {
    return (
      action.type === calorieControlActions.setTotalCalories.type ||
      action.type === calorieControlActions.setAmountOfWater.type ||
      action.type === calorieControlActions.setWaterDrunkIndex.type ||
      action.type === calorieControlActions.setBreakfast.type ||
      action.type === calorieControlActions.setLunch.type ||
      action.type === calorieControlActions.setDinner.type ||
      action.type === calorieControlActions.setSnack.type ||
      action.type === calorieControlActions.setActivity.type
    );
  },
  effect: async () => {
    const state = store.getState();

    if (state.calorieControl.userId !== null && state.calorieControl.selectedDate !== null) {
      const dataToUpdate = { ...state.calorieControl };

      try {
        console.log(dataToUpdate);
        await updateCalorieControl(state.calorieControl.userId, dataToUpdate);
        console.log("PATCH request successful", dataToUpdate);
      } catch (error) {
        console.error("Error during PATCH request:", error);
      }
    } else {
      return;
    }
  },
});
