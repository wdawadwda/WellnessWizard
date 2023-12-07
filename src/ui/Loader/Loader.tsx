import { ActivityIndicator, StyleSheet, View } from "react-native";
import { backgroundColorSecond3 } from "../../entities/const/style/globalDark.style";

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={backgroundColorSecond3} />
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
    padding: 10,
  },
});

export default Loader;
