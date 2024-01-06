import { StyleSheet } from "react-native";
import * as stylesConstDark from "../const/style/globalDark.style";
import * as stylesConstLight from "../const/style/globalLight.style";
import { fontsStyles } from "../../../App";
import { Theme } from "../../store/theme/theme.type";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  alert: {
    textAlign: "center",
    padding: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  picker: {
    backgroundColor: stylesConstDark.backgroundColorSecond,
    color: stylesConstDark.textColor,
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  textForButtonDetail: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: stylesConstDark.backgroundColor,
  },
  text: {
    color: stylesConstDark.textColor,
  },
  text1: {
    color: stylesConstDark.textSecondColor,
  },
  text2: {
    color: stylesConstDark.textColor,
  },
  containerAlert: {
    backgroundColor: stylesConstDark.backgroundAlert,
  },
  containerSuccess: {
    backgroundColor: stylesConstDark.backgroundColorSecond,
  },
});

export const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: stylesConstLight.backgroundColor,
  },
  text: {
    color: stylesConstLight.textColor,
  },
  text1: {
    color: stylesConstLight.textSecondColor,
  },
  text2: {
    color: stylesConstLight.textColor3,
  },
  containerAlert: {
    backgroundColor: stylesConstLight.backgroundAlert,
  },
  containerSuccess: {
    backgroundColor: stylesConstDark.backgroundColorSecond,
  },
});

export const commonTextStyle = (
  theme: Theme,
  styleVariant: "text" | "text1" | "text2",
  textVariant: "title" | "subtitle" | "text" | "text2",
) => [theme === "dark" ? darkStyles[styleVariant] : lightStyles[styleVariant], fontsStyles[textVariant]];
