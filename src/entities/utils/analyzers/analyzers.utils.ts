import { type CalcBMR, type DaysToReachGoalProps } from "../../type/analyzers/calorieAnalyzer.type";

export const calculateBMR = ({ weight, height, age, gender }: CalcBMR) => {
  const genderMultiplier = gender === "male" ? 5 : -161;
  return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age + genderMultiplier;
};

export const calculateDaysToReachGoal = ({
  weight,
  desiredWeight,
  dailyCalories,
  caloriesForSafeWeightLoss,
}: DaysToReachGoalProps) => {
  const caloriesToLoseOneKilogram = 7700;
  const daysToReachGoal =
    ((weight - desiredWeight) * caloriesToLoseOneKilogram) / (dailyCalories - caloriesForSafeWeightLoss);

  return daysToReachGoal.toFixed(0);
};

export const getFatLevelDescription = (gender: string, bmi: number): string | undefined => {
  let bodyFatPercentage;
  if (gender === "male") {
    if (bmi < 18.5) {
      bodyFatPercentage = "l";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bodyFatPercentage = "m";
    } else {
      bodyFatPercentage = "h";
    }
  } else if (gender === "female") {
    if (bmi < 18.5) {
      bodyFatPercentage = "l";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bodyFatPercentage = "m";
    } else {
      bodyFatPercentage = "h";
    }
  }
  return bodyFatPercentage;
};

export const calculateIdealWeightDevine = (height: number, gender: string) => {
  const factor = gender === "male" ? 50 : 45.5;
  const idealWeight = factor + 2.3 * (0.394 * height - 60);
  return idealWeight;
};

export const calculateIdealWeightLorenz = (height: number, gender: string) => {
  const factor = gender === "male" ? 2 : 4;
  const idealWeightLorenz = height - 100 - (height - 150) / factor;
  return idealWeightLorenz;
};

export const calculateIdealWeightBMI = (height: number, gender: string) => {
  const idealBMI = gender === "male" ? 22 : 21.5;
  const idealWeightBMI = idealBMI * (height / 100) ** 2;
  return idealWeightBMI;
};
