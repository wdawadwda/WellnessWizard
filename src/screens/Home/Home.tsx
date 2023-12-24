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

export default function Home({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const handlePress = () => {
    navigation.navigate("RegAuth" as never);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userActions.logout());
  };
  //! Удалить
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
      console.log("Data retrieved from AsyncStorage:", storedData);
      console.log(user);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
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
        </View>
      </ScrollView>
    </Layout>
  );
}
