import { CALORIES_TYPES, MEAL_TYPES } from "../../const/calories.const";

export type CaloriesType = (typeof CALORIES_TYPES)[number];
export type MealTypes = (typeof MEAL_TYPES)[number];
