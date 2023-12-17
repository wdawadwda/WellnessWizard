import { ActivityIndicator, StyleSheet, View } from "react-native";
import { backgroundColorSecond } from "../../../entities/const/style/globalDark.style";

const Loader = ({ size }: { size: number }) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size={size} color={backgroundColorSecond} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});

export default Loader;
