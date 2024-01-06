import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Loader from "../../../../shared/ui/Loader/Loader";
import { type ProductRowProps, type Suggestion } from "../recipeAnalyzer.type";
import { calculateNutrition } from "./productRow.util";
import { searchProduct } from "../../../../store/api/analyzer";
import { initialProductWithWeight } from "../../../../entities/const/recipeAnalyzer.const";
import { debounce } from "../../../../entities/utils/debounce/debounce";
import { t } from "i18next";
import * as styles from "../../../../entities/styles/global.style";
import { stylesRecipe } from "../recipeAnalyzer.style";

export const ProductRow = ({ index, updateRow, theme }: ProductRowProps) => {
  const { control, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [weight, setWeight] = useState("100");
  const [prevWeight, setPrevWeight] = useState(100);
  const [error, setError] = useState("");
  const [rowNewData, setRow] = useState({ ...initialProductWithWeight });

  const handleInputChange = debounce(async (text: string) => {
    if (text) {
      try {
        setError("");
        setIsLoading(true);
        const data = await searchProduct(text);
        setSuggestions(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(t("errors.defaultError"));
      }
    } else {
      setError("");
      setIsLoading(false);
      setSuggestions([]);
    }
  }, 300);

  const handleSelectSuggestion = (selectedItem: Suggestion) => {
    const updatedRowData = {
      product: selectedItem.product_name,
      weight: 100,
      protein: selectedItem.proteins,
      fat: selectedItem.fats,
      carbs: selectedItem.carbohydrates,
      calories: selectedItem.energy,
    };
    setRow(updatedRowData);
    setSuggestions(null);
  };

  useEffect(() => {
    setValue(`product-${index}`, rowNewData.product);
    setWeight("100");
    setPrevWeight(100);
  }, [rowNewData.product, setValue, index]);

  useEffect(() => {
    updateRow(index, rowNewData);
  }, [rowNewData]);

  const handleWeightChange = (text: string) => {
    const isValidWeight = !isNaN(parseFloat(text)) && isFinite(parseFloat(text));

    if (isValidWeight) {
      setWeight(text);

      const updatedRowData = {
        ...rowNewData,
        weight: parseFloat(text),
      };

      const nutritionValues = calculateNutrition(updatedRowData, parseFloat(text), prevWeight);

      setRow({
        ...updatedRowData,
        ...nutritionValues,
      });
      setPrevWeight(parseFloat(text));
    }
  };

  return (
    <View style={stylesRecipe.mainContainer} key={index}>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          {error ? (
            <View style={[styles.darkStyles.containerAlert, { marginBottom: 10 }]}>
              <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{error}</Text>
            </View>
          ) : null}
          {isLoading ? (
            <Loader size={18}></Loader>
          ) : (
            <Text style={[styles.commonTextStyle(theme, "text2", "text"), styles.styles.inputLabel]}>
              {`${t("text.analyzersText.product.inputTitle.product")}:`}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.styles.input}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  handleInputChange(text);
                }}
                placeholder={``}
              />
            )}
            name={`product-${index}`}
            defaultValue={rowNewData.product}
          />
        </View>
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          suggestions.map((item: Suggestion) => (
            <TouchableOpacity key={item.id} onPress={() => handleSelectSuggestion(item)}>
              <Text style={[styles.commonTextStyle(theme, "text1", "text"), stylesRecipe.suggestions]}>
                {item.product_name}
              </Text>
            </TouchableOpacity>
          ))
        ) : suggestions !== null && suggestions.length === 0 && !isLoading ? (
          <View style={[styles.darkStyles.containerAlert, { marginBottom: 10 }]}>
            <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]} key="notFound">
              {t("errors.notFound")}
            </Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.commonTextStyle(theme, "text2", "text"), styles.styles.inputLabel]}>
        {`${t("text.analyzersText.product.inputTitle.productGr")}:`}
      </Text>
      <TextInput
        style={styles.styles.input}
        value={String(weight)}
        onChangeText={(text) => setWeight(text)}
        onBlur={() => handleWeightChange(weight)}
        keyboardType="numeric"
      />
      <View style={{ flexDirection: "row", marginBottom: 25 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {`${t("text.analyzersText.product.protein")} ${t("text.analyzersText.product.gramm")}`}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {rowNewData.protein}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {`${t("text.analyzersText.product.fat")} ${t("text.analyzersText.product.gramm")}`}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {rowNewData.fat}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {`${t("text.analyzersText.product.carbohydrates")} ${t("text.analyzersText.product.gramm")}`}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {rowNewData.carbs}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cell]}>
            {t("text.analyzersText.product.calories")}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cell]}>
            {rowNewData.calories}
          </Text>
        </View>
      </View>
    </View>
  );
};
