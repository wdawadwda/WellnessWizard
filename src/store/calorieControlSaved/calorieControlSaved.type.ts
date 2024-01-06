import { type Activity, type Product } from "../../entities/type/analyzers/calorieAnalyzer.type";
import { type Status } from "../../entities/type/api/api.type";

type Settings = {
  totalCalories: number | null;
  amountOfWater: number | null;
};

export type CalorieControlState = {
  data: {
    [key: string]: CalorieControlData;
  } | null;
  status: Status;
};

type CalorieControlData = {
  userId: number;
  settings: Settings;
  selectedDate: string;
  waterDrunkIndex: number | null;
  dinner: Product[] | null;
  lunch: Product[] | null;
  breakfast: Product[] | null;
  snack: Product[] | null;
  activity: Activity[] | null;
} | null;
