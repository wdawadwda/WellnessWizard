import { type MealTypes } from "../../type/calorieControl/calorieControl.type";
import { type Activity, type Product } from "../../type/analyzers/calorieAnalyzer.type";
import { type ActionCreatorWithPayload } from "../../type/calorieControl/addPosition.type";

export const reducersMap: Record<MealTypes, ActionCreatorWithPayload<Product[] | Activity[]>> = {
  activity: (payload) => ({ payload, type: "calorieControl/setActivity" }),
  breakfast: (payload) => ({ payload, type: "calorieControl/setBreakfast" }),
  lunch: (payload) => ({ payload, type: "calorieControl/setLunch" }),
  dinner: (payload) => ({ payload, type: "calorieControl/setDinner" }),
  snack: (payload) => ({ payload, type: "calorieControl/setSnack" }),
};
