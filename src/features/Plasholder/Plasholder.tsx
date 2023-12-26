import { Text, View } from "react-native";
import { type Theme } from "../../store/theme/theme.type";
import * as styles from "../../entities/styles/global.style";
import { MaterialIcons } from "@expo/vector-icons";
import { textSecondColor as ColorDark } from "../../entities/const/style/globalDark.style";
import { textSecondColor as ColorLight } from "../../entities/const/style/globalLight.style";
import { t } from "i18next";

export default function Plasholder({ theme }: { theme: Theme }) {
  return (
    <View style={{ marginTop: 50, alignItems: "center", justifyContent: "center" }}>
      <Text style={[styles.commonTextStyle(theme, "text2", "subtitle")]}>{t("plasholder")}</Text>
      <MaterialIcons
        name="engineering"
        style={{ marginTop: 50 }}
        size={250}
        color={theme === "dark" ? ColorDark : ColorLight}
      />
    </View>
  );
}
