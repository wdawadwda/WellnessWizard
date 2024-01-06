import { type Theme } from "../../../store/theme/theme.type";
import React, { useEffect, useState } from "react";
import { Button } from "../../../shared/ui/Button/Button";
import { ProductRow } from "./ProductRow/ProductRow";
import { initialProduct, initialProductWithWeight } from "../../../entities/const/recipeAnalyzer.const";
import { TotalRow } from "./TotalRow/TotalRow";
import { t } from "i18next";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { textColor } from "../../../entities/const/style/globalDark.style";
import { type Product } from "../../../entities/type/analyzers/calorieAnalyzer.type";

export default function RecipeAnalyzer({
  theme,
  onRowsUpdate,
}: {
  theme: Theme;
  onRowsUpdate?: (updatedRows: Product[]) => void;
}) {
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

  const handleRemoveProduct = (index: number) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
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

  useEffect(() => {
    if (onRowsUpdate) {
      onRowsUpdate(rows);
    }
  }, [onRowsUpdate, rows]);

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      {rows.map((row, index) => (
        <React.Fragment key={index}>
          <Button onPress={() => handleRemoveProduct(index)}>
            <Ionicons name="md-trash-outline" size={25} color={textColor} />
          </Button>
          <ProductRow theme={theme} key={index} index={index} updateRow={updateRow} />
        </React.Fragment>
      ))}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button style={{ flex: 0.4 }} onPress={handleAddProduct}>
          {t("buttonsTitles.analyzers.addProduct")}
        </Button>
        <Button style={{ flex: 0.4 }} onPress={handleCalculateTotal}>
          {t("buttonsTitles.analyzers.calcTotal")}
        </Button>
      </View>

      <TotalRow theme={theme} label={t("titles.total")} values={totalValues} />
      <TotalRow theme={theme} label={t("titles.total100")} values={valuesPer100g} />
    </View>
  );
}
