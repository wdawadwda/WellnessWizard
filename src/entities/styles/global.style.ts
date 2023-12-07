import { StyleSheet } from "react-native";
import * as stylesConstDark from "../const/style/globalDark.style";
import * as stylesConstLight from "../const/style/globalLight.style";

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
    color: stylesConstDark.textSecond3Color,
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
    color: stylesConstLight.textColor,
  },
});
