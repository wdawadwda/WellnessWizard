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
