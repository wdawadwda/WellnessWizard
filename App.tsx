import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "./src/entities/styles/global.style";
import { Navigation } from "./src/navigation/Navigation";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
  //   "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
  //   "PlayfairDisplay-VariableFont_wght": require("./src/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

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
    fontSize: 50,
    textAlign: "center",
    marginBottom: 25,
    textTransform: "uppercase",
    // fontFamily: "Roboto-Bold",
  },
  subtitle: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 15,
    // fontFamily: "PlayfairDisplay-VariableFont_wght",
  },
  subtitle2: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 15,
    // fontFamily: "Roboto-Regular",
  },
  text: {
    fontSize: 15,
    // fontFamily: "PlayfairDisplay-VariableFont_wght",
  },
  text2: {
    fontSize: 15,
    // fontFamily: "Roboto-Regular",
  },
});
