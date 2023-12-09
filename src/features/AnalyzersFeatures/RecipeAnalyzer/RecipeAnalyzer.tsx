import { Theme } from "../../../../store/theme/theme.type";
import { useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { ProductRow } from "./ProductRow/ProductRow";
import { Product } from "./recipeAnalyzer.type";
import { initialProduct, initialProductWithWeight } from "./recipeAnalyzer.const";
import { TotalRow } from "./TotalRow/TotalRow";
import { t } from "i18next";
import { View } from "react-native";

export default function RecipeAnalyzer({ theme }: { theme: Theme }) {
  const [rows, setRows] = useState<Product[]>([initialProduct]);
  const [totalValues, setTotalValues] = useState<Product>({
    ...initialProduct,
  });
  const [valuesPer100g, setValuesPer100g] = useState<Product>({
    ...initialProductWithWeight,
  });

  const updateRow = (index: number, newData: Product) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = newData;
      return updatedRows;
    });
  };

  const handleAddProduct = () => {
    setRows((prevRows) => [...prevRows, { ...initialProduct }]);
  };

  const handleCalculateTotal = () => {
    const newTotalValues = rows.reduce(
      (accumulator, { weight, protein, fat, carbs, calories }) => {
        accumulator.weight += weight;
        accumulator.protein += protein;
        accumulator.fat += fat;
        accumulator.carbs += carbs;
        accumulator.calories += calories;
        return accumulator;
      },
      { ...initialProduct },
    );

    const roundedTotalValues = {
      weight: newTotalValues.weight,
      protein: +newTotalValues.protein.toFixed(1),
      fat: +newTotalValues.fat.toFixed(1),
      carbs: +newTotalValues.carbs.toFixed(1),
      calories: +newTotalValues.calories.toFixed(1),
    };

    setTotalValues(roundedTotalValues as Product);

    const newValuesPer100g = {
      weight: 100,
      protein: +((newTotalValues.protein * 100) / newTotalValues.weight).toFixed(1),
      fat: +((newTotalValues.fat * 100) / newTotalValues.weight).toFixed(1),
      carbs: +((newTotalValues.carbs * 100) / newTotalValues.weight).toFixed(1),
      calories: +((newTotalValues.calories * 100) / newTotalValues.weight).toFixed(1),
    };

    setValuesPer100g(newValuesPer100g as Product);
  };

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      {rows.map((row, index) => (
        <ProductRow theme={theme} key={index} index={index} updateRow={updateRow} />
      ))}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button onPress={handleAddProduct}>{t("buttonsTitles.analyzers.addProduct")}</Button>
        <Button onPress={handleCalculateTotal}>{t("buttonsTitles.analyzers.calcTotal")}</Button>
      </View>

      <TotalRow theme={theme} label={t("titles.total")} values={totalValues} />
      <TotalRow theme={theme} label={t("titles.total100")} values={valuesPer100g} />
    </View>
  );
}
