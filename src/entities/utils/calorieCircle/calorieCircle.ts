export const calculatePercentage = (consumedCalories: number, totalCalories: number): number => {
  return (consumedCalories / totalCalories) * 100;
};

export const calculateCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

export const calculateConsumedCircumference = (percentage: number, circumference: number): number => {
  return (percentage / 100) * circumference;
};
