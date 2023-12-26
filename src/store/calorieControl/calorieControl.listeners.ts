import { createListenerMiddleware } from "@reduxjs/toolkit";
import { calorieControlActions } from "./calorieControl.slice";
import { store } from "../store";

export const listenerMiddlewareCalorieControl = createListenerMiddleware();

listenerMiddlewareCalorieControl.startListening({
  predicate: (action) => {
    return (
      action.type === calorieControlActions.setTotalCalories.type ||
      action.type === calorieControlActions.setAmountOfWater.type ||
      action.type === calorieControlActions.setSelectedDate.type ||
      action.type === calorieControlActions.setWaterDrunkIndex.type
    );
  },
  effect: (action) => {
    // console.log("Action processed:", action);
    const state = store.getState();
    // console.log("state:", state.calorieControl);
  },
});
