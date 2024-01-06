import { Text, View } from "react-native";
import { type CaloriesPropitris } from "./сalories.type";
import { Button } from "../../../shared/ui/Button/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { type HomeScreenNavigationProp } from "../../../navigation/navigation.type";
import { t } from "i18next";

export default function Calories({ theme, type, title }: CaloriesPropitris) {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToAddProduct = (isCustom: boolean) => {
    const params = {
      mealType: type,
      title: title,
      isCustom: isCustom,
    };
    navigation.navigate("AddPosition", params);
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Button onPress={() => setIsVisible(!isVisible)}>
        <Text>{t(`text.analyzersText.calorieControl.meals.${title}`)}</Text>
      </Button>
      {isVisible && type === "meals" && (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button style={{ marginTop: 5, flex: 0.4 }} onPress={() => navigateToAddProduct(false)}>
            {t(`buttonsTitles.analyzers.addProduct`)}
          </Button>
          <Button style={{ marginTop: 5, flex: 0.4 }} onPress={() => navigateToAddProduct(true)}>
            {t(`buttonsTitles.analyzers.addCustomProduct`)}
          </Button>
        </View>
      )}
      {isVisible && type === "activity" && (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button style={{ marginTop: 5, flex: 0.9 }} onPress={() => navigateToAddProduct(false)}>
            {t(`buttonsTitles.analyzers.addExercise`)}
          </Button>
        </View>
      )}
    </View>
  );
}
