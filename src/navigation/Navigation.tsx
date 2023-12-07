import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TabNavigator } from "./Tab";
import { Theme } from "../../store/theme/theme.type";
import { selectTheme } from "../../store/theme/theme.selectors";
import { themeActions } from "../../store/theme/theme.slice";

export const Navigation = () => {
  const isDark = useColorScheme();
  const dispatch = useDispatch();
  const theme: Theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(themeActions.setTheme(isDark ? "dark" : "light"));
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator theme={theme} />
    </NavigationContainer>
  );
};
