export interface CalcBMR {
  weight: number;
  height: number;
  age: number;
  gender: string;
}

export interface DaysToReachGoalProps {
  weight: number;
  desiredWeight: number;
  dailyCalories: number;
  caloriesForSafeWeightLoss: number;
}

export interface Product {
  product: string;
  weight: number;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export type ProductFormData = Omit<Product, "carbs" | "fat" | "protein"> & {
  carbs?: number;
  fat?: number;
  protein?: number;
};

export interface Activity {
  exercise: string;
  calories: number;
}
