import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "./src/entities/styles/global.style";
import { Navigation } from "./src/navigation/Navigation";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("./src/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./src/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./src/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
}

export const fontsStyles = StyleSheet.create({
  title: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 25,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
});
