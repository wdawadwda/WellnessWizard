import { ScrollView, View } from "react-native";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { type Theme } from "../../store/theme/theme.type";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../shared/ui/Button/Button";
import { t } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user/user.slice";
import { selectUser } from "../../store/user/user.selectors";
import { KEYS } from "../../entities/const/asyncStorage.const";
import { selectCalorieControl } from "../../store/calorieControl/calorieControl.selectors";

export default function Home({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const calorieControlState = useSelector(selectCalorieControl);
  const user = useSelector(selectUser);
  const handlePress = () => {
    navigation.navigate("RegAuth" as never);
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  //! Удалить
  const handleShowUser = async () => {
    console.log(calorieControlState);
    try {
      console.log(user);
    } catch (error) {
      console.error("User is not found", error);
    }
  };

  const handleSaveToStorage = async () => {
    try {
      await AsyncStorage.setItem("storedData", "wda");
      console.log("Data saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const handleShowStorageData = async () => {
    try {
      const storedData = await AsyncStorage.getAllKeys();
      const filteredData = await AsyncStorage.multiGet([
        KEYS.USER.REFRESH_TOKEN,
        KEYS.USER.ACCESS_TOKEN,
        KEYS.CALORIE_CONTROL.TOTAL_CALORIES,
      ]);
      console.log(user);
      console.log("Data retrieved from AsyncStorage:", storedData);
      console.log("Filtered data for specific keys:", filteredData);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER.REFRESH_TOKEN);
      await AsyncStorage.removeItem(KEYS.USER.ACCESS_TOKEN);
      await AsyncStorage.removeItem(KEYS.CALORIE_CONTROL.TOTAL_CALORIES);
      await AsyncStorage.removeItem(KEYS.CALORIE_CONTROL.AMOUNT_OF_WATER);
      await AsyncStorage.removeItem("storedData");
      console.log("Data cleared from AsyncStorage.");
    } catch (error) {
      console.error("Error clearing data from AsyncStorage:", error);
    }
  };
  //! Удалить

  return (
    <Layout theme={theme}>
      <ScrollView
        style={[theme === "dark" ? styles.darkStyles.container : styles.lightStyles.container, styles.styles.container]}
      >
        {!user && (
          <Button onPress={() => handlePress()}>{`${t("buttonsTitles.regAuth.login")} / ${t(
            "buttonsTitles.regAuth.reg",
          )}`}</Button>
        )}
        {user && <Button onPress={() => handleLogout()}>Logout</Button>}
        {/* Удалить */}
        <View style={{ margin: 50 }}>
          <Button style={{ marginTop: 25 }} onPress={handleSaveToStorage}>
            Save to Storage
          </Button>
          <Button style={{ marginTop: 25 }} onPress={handleShowStorageData}>
            Show Storage Data
          </Button>
          <Button style={{ marginTop: 25 }} onPress={handleClearStorage}>
            Clear Storage
          </Button>
          <Button style={{ marginTop: 25 }} onPress={handleShowUser}>
            Show User
          </Button>
        </View>
        {/* Удалить */}
      </ScrollView>
    </Layout>
  );
}
