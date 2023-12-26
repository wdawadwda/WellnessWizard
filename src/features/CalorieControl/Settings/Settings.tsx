import { Text, View } from "react-native";
import { Theme } from "../../../store/theme/theme.type";
import AddCalorie from "./AddCalorie/AddCalorie";
import * as styles from "../../../entities/styles/global.style";
import AddWater from "./AddWater/AddWater";

export default function Settings({ theme, t }: { theme: Theme; t: (key: string) => string }) {
  return (
    <View>
      <Text style={[styles.commonTextStyle(theme, "text2", "subtitle"), { marginBottom: 25 }]}>
        {t("titles.settings")}
      </Text>
      <AddCalorie t={t} theme={theme} />
      <AddWater t={t} theme={theme} />
    </View>
  );
}
