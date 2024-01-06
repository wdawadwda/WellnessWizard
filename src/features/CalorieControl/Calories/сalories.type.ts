import { type CaloriesType, type MealTypes } from "../../../entities/type/calorieControl/calorieControl.type";
import { type Theme } from "../../../store/theme/theme.type";

export interface CaloriesPropitris {
  type: CaloriesType;
  theme: Theme;
  title: MealTypes;
}
