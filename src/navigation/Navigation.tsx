import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TabNavigator } from "./Tab";
import { type Theme } from "../store/theme/theme.type";
import { selectTheme } from "../store/theme/theme.selectors";
import { themeActions } from "../store/theme/theme.slice";
import { useAuth } from "../entities/use/useAuth";
import { useAppDispatch, useAppSelector } from "../store/store.types";
import { LoaderFetchUser } from "../shared/LoaderFetchUser/LoaderFetchUser";
import { useloadAsyncInState } from "../entities/use/useloadAsyncInState";

export const Navigation = () => {
  const isInitializing = useAppSelector(
    ({ user }) =>
      (user.currentUser.status === "loading" || user.currentUser.status === "idle") && user.tokens.status === "success",
  );

  const isDark = useColorScheme();
  const dispatch = useAppDispatch();
  const theme: Theme = useSelector(selectTheme);
  useAuth(dispatch);
  useloadAsyncInState(dispatch);

  useEffect(() => {
    dispatch(themeActions.setTheme(isDark ? "dark" : "light"));
  }, []);

  return (
    <NavigationContainer>
      {isInitializing ? <LoaderFetchUser theme={theme} /> : <TabNavigator theme={theme} />}
    </NavigationContainer>
  );
};
