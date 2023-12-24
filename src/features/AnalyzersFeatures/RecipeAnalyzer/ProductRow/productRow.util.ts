import { type Product } from "../recipeAnalyzer.type";

export const calculateNutrition = (product: Product, weight: number, prevWeight: number) => {
  const { calories, protein, fat, carbs } = product;
  const weightRatio = weight / prevWeight;

  const calculatedCalories = +(calories * weightRatio).toFixed(1);
  const calculatedProtein = +(protein * weightRatio).toFixed(1);
  const calculatedFat = +(fat * weightRatio).toFixed(1);
  const calculatedCarbohydrates = +(carbs * weightRatio).toFixed(1);

  return {
    calories: calculatedCalories,
    protein: calculatedProtein,
    fat: calculatedFat,
    carbs: calculatedCarbohydrates,
  };
};
