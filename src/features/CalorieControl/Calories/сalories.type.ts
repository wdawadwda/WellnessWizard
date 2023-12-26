import { CALORIES_TYPES, MEAL_TYPES } from "../../../entities/const/calories.const";
import { type Theme } from "../../../store/theme/theme.type";

type CaloriesType = (typeof CALORIES_TYPES)[number];
type MealTypes = (typeof MEAL_TYPES)[number];

export interface CaloriesPropitris {
  type: CaloriesType;
  theme: Theme;
  title: MealTypes;
}
