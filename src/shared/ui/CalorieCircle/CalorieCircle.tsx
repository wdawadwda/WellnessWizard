import { StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { textColor2Extra, textSecondColor } from "../../../entities/const/style/globalDark.style";
import { radius, strokeWidth } from "./calorieCircle.const";
import {
  calculateCircumference,
  calculateConsumedCircumference,
  calculatePercentage,
} from "../../../entities/utils/calorieCircle/calorieCircle";
import { Theme } from "../../../store/theme/theme.type";
import * as styles from "../../../entities/styles/global.style";
import { t } from "i18next";

export const CalorieCircle = ({
  totalCalories,
  consumedCalories,
  theme,
}: {
  totalCalories: number;
  consumedCalories: number;
  theme: Theme;
}) => {
  const percentage = calculatePercentage(consumedCalories, totalCalories);
  const circumference = calculateCircumference(radius);
  const consumedCircumference = calculateConsumedCircumference(percentage, circumference);
  const remainingCalories = totalCalories - consumedCalories;
  return (
    <View style={style.container}>
      <Text style={[styles.commonTextStyle(theme, "text2", "text"), style.text]}>
        {t("text.analyzersText.сalorieCircle.totalCalories", { totalCalories })}
      </Text>
      <Svg height="200" width="200">
        <Circle cx="100" cy="100" r={radius} stroke={textColor2Extra} strokeWidth={strokeWidth} fill="transparent" />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke={textSecondColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${consumedCircumference}, ${circumference}`}
          fill="transparent"
        />
      </Svg>
      <Text style={[styles.commonTextStyle(theme, "text2", "text"), style.text]}>
        {t("text.analyzersText.сalorieCircle.consumedCalories", { consumedCalories })}
      </Text>
      <Text style={[styles.commonTextStyle(theme, "text2", "text"), style.text]}>
        {t("text.analyzersText.сalorieCircle.remainingCalories", { remainingCalories })}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    marginTop: 10,
  },
});
