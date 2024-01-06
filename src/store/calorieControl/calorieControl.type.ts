import { type Activity, type Product } from "../../entities/type/analyzers/calorieAnalyzer.type";

export type CalorieControlState = {
  userId: number | null;
  settings: {
    totalCalories: number | null;
    amountOfWater: number | null;
  };
  selectedDate: string | null;
  waterDrunkIndex: number | null;
  dinner: Product[] | null;
  lunch: Product[] | null;
  breakfast: Product[] | null;
  snack: Product[] | null;
  activity: Activity[] | null;
};
