import { View } from "react-native";
import { Theme } from "../../../store/theme/theme.type";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import * as styles from "../../entities/styles/global.style";
import * as stylesConstDark from "../../entities/const/style/globalDark.style";
import * as stylesConstLight from "../../entities/const/style/globalLight.style";

export const LangSwitcher = ({ theme }: { theme: Theme }) => {
  const { i18n } = useTranslation();

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
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
          },
        ]}
        dropdownIconColor={
          theme === "dark"
            ? stylesConstDark.textSecondColor
            : stylesConstLight.textSecondColor
        }
        selectedValue={i18n.language}
        onValueChange={handleChangeLanguage}
      >
        <Picker.Item label="EN" value="en" />
        <Picker.Item label="RU" value="ru" />
      </Picker>
    </View>
  );
};
