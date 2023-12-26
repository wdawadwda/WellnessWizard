export type CalorieControlState = {
  settings: {
    totalCalories: number | null;
    amountOfWater: number | null;
  };
  selectedDate: string | null;
  waterDrunkIndex: number | null;
};
