import { View, Text } from "react-native";
import { TotalRowProps } from "../recipeAnalyzer.type";
import { t } from "i18next";
import { stylesRecipe } from "../recipeAnalyzer.style";
import * as styles from "../../../../entities/styles/global.style";

export const TotalRow = ({ label, values, theme }: TotalRowProps) => {
  return (
    <>
      <Text style={[styles.commonTextStyle(theme, "text2", "text"), styles.styles.inputLabel, stylesRecipe.rowTitle]}>
        {label}:
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {t("text.analyzersText.product.weight")}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {values.weight}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>{`${t(
            "text.analyzersText.product.protein",
          )} ${t("text.analyzersText.product.gramm")}`}</Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {values.protein}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {`${t("text.analyzersText.product.fat")} ${t("text.analyzersText.product.gramm")}`}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {values.fat}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {`${t("text.analyzersText.product.carbohydrates")} ${t("text.analyzersText.product.gramm")}`}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cellWithBorder]}>
            {values.carbs}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cell]}>
            {t("text.analyzersText.product.calories")}
          </Text>
          <Text style={[styles.commonTextStyle(theme, "text2", "text2"), stylesRecipe.cell]}>{values.calories}</Text>
        </View>
      </View>
    </>
  );
};
