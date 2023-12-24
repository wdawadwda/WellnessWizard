import { StyleSheet } from "react-native";

export const stylesRecipe = StyleSheet.create({
  cell: { textAlign: "center" },
  cellWithBorder: {
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "white",
  },
  suggestions: {
    textAlign: "center",
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  rowTitle: {
    marginBottom: 25,
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: "white",
    padding: 10,
  },
});
