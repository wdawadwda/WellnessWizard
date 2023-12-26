import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { type Theme } from "../../../store/theme/theme.type";
import { type RouteParams } from "../../../navigation/navigation.type";
import { Button } from "../../../shared/ui/Button/Button";
import RecipeAnalyzer from "../../../features/AnalyzersFeatures/RecipeAnalyzer/RecipeAnalyzer";
import { Layout } from "../../../features/Layout/Layout";
import { ScrollView } from "react-native";
import * as styles from "../../../entities/styles/global.style";
import { useState } from "react";
import { type Product } from "../../../entities/type/analyzers/calorieAnalyzer.type";
import { initialProduct } from "../../../entities/const/recipeAnalyzer.const";
import { useAppDispatch } from "../../../store/store.types";
import { t } from "i18next";
import { reducersMap } from "../../../entities/utils/calorieControl/addPosition.utils";
import { BackButton } from "../../../shared/ui/Button/BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";
import AddCustomProduct from "../../../features/CalorieControl/AddCustomProduct/AddCustomProduct";
import AddCustomActivity from "../../../features/CalorieControl/AddCustomActivity/AddCustomActivity";

export default function AddPosition({ theme }: { theme: Theme }) {
  const [isProductAdded, setProductAdded] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteParams>();
  const [updatedRows, setUpdatedRows] = useState<Product[]>([initialProduct]);

  const { mealType, title, isCustom } = route.params;

  const handleAddPositionMeals = () => {
    const filteredRows = updatedRows.filter((product) => product.product.trim() !== "");

    const updatedData = [...filteredRows];

    const reducer = reducersMap[title];
    if (reducer) {
      dispatch(reducer(updatedData));
    }
    setProductAdded(true);
  };

  return (
    <Layout theme={theme}>
      {mealType === "meals" && !isCustom && (
        <Button style={{ marginBottom: 15 }} onPress={handleAddPositionMeals}>
          {t(`buttonsTitles.analyzers.saveProduct`)}
        </Button>
      )}
      {isProductAdded && (
        <View style={[styles.darkStyles.containerSuccess, { marginBottom: 15 }]}>
          <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>
            {t(`success.success`)}
          </Text>
        </View>
      )}
      <ScrollView style={[styles.styles.container]}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={[styles.commonTextStyle(theme, "text2", "subtitle"), { marginTop: 15 }]}>
          <Text>{t(`text.analyzersText.calorieControl.meals.${title}`)}</Text>
        </Text>
        {mealType === "meals" && !isCustom && (
          <>
            <RecipeAnalyzer theme={theme} onRowsUpdate={(rows) => setUpdatedRows(rows)} />
          </>
        )}
        {mealType === "meals" && isCustom && <AddCustomProduct success={setProductAdded} title={title} theme={theme} />}
        {mealType === "activity" && <AddCustomActivity success={setProductAdded} title={title} theme={theme} />}
      </ScrollView>
    </Layout>
  );
}
