import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RouteProp } from "@react-navigation/native";
import { type CaloriesType, type MealTypes } from "../entities/type/calorieControl/calorieControl.type";

type NavigationParamsAddProduct = {
  mealType: CaloriesType;
  title: MealTypes;
  isCustom: boolean;
};

export type RouteParams = RouteProp<RootStackParamList, "AddPosition"> & NavigationParamsAddProduct;

export type RootStackParamList = {
  Home: undefined;
  RegAuth: undefined;
  Food: undefined;
  Analyzers: undefined;
  AddPosition: NavigationParamsAddProduct;
  Fitness: undefined;
};
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
