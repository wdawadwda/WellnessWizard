import { type Theme } from "../../../store/theme/theme.type";

export interface Product {
  product: string;
  weight: number;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export interface TotalRowProps {
  label: string;
  values: {
    weight: number;
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
  theme: Theme;
}

export interface Suggestion {
  id: number;
  product_name: string;
  proteins: number;
  fats: number;
  carbohydrates: number;
  energy: number;
}

export interface ProductRowProps {
  index: number;
  updateRow: (index: number, newData: Product) => void;
  theme: Theme;
}

export interface CalculateNut {
  product: Product;
  weight: number;
  prevWeight: number;
}
