import { MealTypes } from "../../../entities/type/calorieControl/calorieControl.type";
import { Theme } from "../../../store/theme/theme.type";

export interface AddCustomProductProps {
  theme: Theme;
  title: MealTypes;
  success: (value: boolean) => void;
}

export interface FormField {
  name: "product" | "weight" | "calories" | "carbs" | "fat" | "protein";
  placeholder: string;
  label: string;
  keyboardType: "numeric" | "default";
}
