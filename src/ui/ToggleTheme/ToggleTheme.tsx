import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as stylesConstDark from "../../entities/const/style/globalDark.style";
import * as stylesConstLight from "../../entities/const/style/globalLight.style";
import { Theme } from "../../../store/theme/theme.type";
import { themeActions } from "../../../store/theme/theme.slice";
import { Button } from "../Button/Button";

export const ToggleTheme = ({ theme }: { theme: Theme }) => {
  const dispatch = useDispatch();

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <View>
      <Button
        style={{
          backgroundColor:
            theme === "dark"
              ? stylesConstDark.backgroundColor
              : stylesConstLight.backgroundColor,
          padding: 10,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
        onPress={toggleThemeHandler}
      >
        {theme === "dark" ? (
          <Feather name="sun" size={25} color={stylesConstDark.textColor} />
        ) : (
          <Feather name="moon" size={25} color={stylesConstLight.textColor2} />
        )}
      </Button>
    </View>
  );
};
