import { View } from "react-native";
import { type Theme } from "../../../store/theme/theme.type";
import { Picker } from "@react-native-picker/picker";
import * as styles from "../../../entities/styles/global.style";
import * as stylesConstDark from "../../../entities/const/style/globalDark.style";
import * as stylesConstLight from "../../../entities/const/style/globalLight.style";
import i18n from "../../../i18n";

export const LangSwitcher = ({ theme }: { theme: Theme }) => {
  const handleChangeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <View>
      <Picker
        style={[
          theme === "dark" ? styles.darkStyles.text1 : styles.lightStyles.text1,
          {
            width: 110,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
          },
        ]}
        dropdownIconColor={theme === "dark" ? stylesConstDark.textSecondColor : stylesConstLight.textSecondColor}
        selectedValue={i18n.language}
        onValueChange={handleChangeLanguage}
      >
        <Picker.Item label="EN" value="en" />
        <Picker.Item label="RU" value="ru" />
      </Picker>
    </View>
  );
};
