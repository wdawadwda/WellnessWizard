import { Product } from "./recipeAnalyzer.type";

export const initialProduct: Product = {
  product: "",
  weight: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
  calories: 0,
};

export const initialProductWithWeight: Product = {
  product: "",
  weight: 100,
  protein: 0,
  fat: 0,
  carbs: 0,
  calories: 0,
};
