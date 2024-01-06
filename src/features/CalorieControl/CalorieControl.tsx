import { Text, View } from "react-native";
import { Theme } from "../../store/theme/theme.type";
import { Feather } from "@expo/vector-icons";
import { t } from "i18next";
import { CalorieCircle } from "../../shared/ui/CalorieCircle/CalorieCircle";
import { textSecondColor } from "../../entities/const/style/globalDark.style";
import { Button } from "../../shared/ui/Button/Button";
import { useEffect, useState } from "react";
import * as styles from "../../entities/styles/global.style";
import { AntDesign } from "@expo/vector-icons";
import Settings from "./Settings/Settings";
import AmountWater from "./AmountWater/AmountWater";
import { useSelector } from "react-redux";
import { selectCalorieControl } from "../../store/calorieControl/calorieControl.selectors";
import { CalendarComponent } from "./CalendarComponent/CalendarComponent";
import Calories from "./Calories/Calories";
import { selectUser } from "../../store/user/user.selectors";
import { useNavigation } from "@react-navigation/native";
import { selectcalorieControlSavedData } from "../../store/calorieControlSaved/calorieControlSaved.selectors";

export default function CalorieControl({ theme }: { theme: Theme }) {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const calorieControlState = useSelector(selectCalorieControl);
  const calorieControlSavedData = useSelector(selectcalorieControlSavedData);
  const user = useSelector(selectUser);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("обновление");
  }, [calorieControlState]);

  if (!user) {
    return (
      <View style={{ marginBottom: 50, marginTop: 25 }}>
        <Button onPress={() => navigation.navigate("RegAuth" as never)}>{`${t("buttonsTitles.regAuth.login")} / ${t(
          "buttonsTitles.regAuth.reg",
        )}`}</Button>
        <Text style={[styles.commonTextStyle(theme, "text2", "subtitle"), { marginTop: 25 }]}>{t("loginAlert")}</Text>
      </View>
    );
  }

  const selectedDataFromSaved =
    calorieControlSavedData !== null && calorieControlState.selectedDate
      ? calorieControlSavedData[calorieControlState.selectedDate] || null
      : null;

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      <View style={{ flex: 1, flexDirection: "row-reverse" }}>
        <Button onPress={() => setShowSettings(!showSettings)} style={{ backgroundColor: "inherit" }}>
          {showSettings ? (
            <AntDesign name="arrowleft" size={25} color={textSecondColor} />
          ) : (
            <Feather name="settings" size={25} color={textSecondColor} />
          )}
        </Button>
      </View>
      {showSettings ? (
        <Settings t={t} theme={theme} />
      ) : (
        <>
          <CalendarComponent />
          <CalorieCircle
            theme={theme}
            totalCalories={selectedDataFromSaved?.settings?.totalCalories}
            consumedCalories={300}
          />

          <Calories theme={theme} type={"meals"} title={"breakfast"} />
          <Calories theme={theme} type={"meals"} title={"lunch"} />
          <Calories theme={theme} type={"meals"} title={"dinner"} />
          <Calories theme={theme} type={"meals"} title={"snack"} />
          <Calories theme={theme} type={"activity"} title={"activity"} />
          {calorieControlState.settings.amountOfWater ? (
            <AmountWater amountOfWater={calorieControlState.settings.amountOfWater} />
          ) : (
            <>
              <Text style={[styles.commonTextStyle(theme, "text2", "subtitle"), { marginTop: 25 }]}>
                {t("text.analyzersText.calorieControl.settingsAlert", {
                  target: t("text.analyzersText.calorieControl.water"),
                })}
              </Text>
            </>
          )}
        </>
      )}
    </View>
  );
}
