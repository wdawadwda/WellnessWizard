import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as stylesConstDark from "../entities/const/style/globalDark.style";
import * as stylesConstLight from "../entities/const/style/globalLight.style";
import {
  StackFitnessNavigator,
  StackFoodNavigator,
  StackNavigator,
} from "./Stack";
import { Theme } from "../../store/theme/theme.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
export const TabNavigator = ({ theme }: { theme: Theme }) => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: stylesConstDark.backgroundColorSecond3,
        tabBarInactiveTintColor: theme === "dark" ? "gray" : "gray",
        tabBarStyle: {
          backgroundColor:
            theme === "dark"
              ? stylesConstDark.backgroundColor
              : stylesConstLight.backgroundColor,
          borderTopColor: stylesConstDark.backgroundColorSecond3,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        initialParams={{ initialRoute: "Home" }}
        options={{
          tabBarLabel: t("tabLabels.home"), // Используйте t для перевода
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={35} color={color} />
          ),
          headerShown: false,
        }}
      >
        {() => <StackNavigator theme={theme} />}
      </Tab.Screen>

      <Tab.Screen
        name="FoodTab"
        initialParams={{ initialRoute: "Food" }}
        options={{
          tabBarLabel: t("tabLabels.food"), // Используйте t для перевода
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-apple" size={35} color={color} />
          ),
          headerShown: false,
        }}
      >
        {() => <StackFoodNavigator theme={theme} />}
      </Tab.Screen>

      <Tab.Screen
        name="FitnessTab"
        initialParams={{ initialRoute: "Fitness" }}
        options={{
          tabBarLabel: t("tabLabels.fitness"), // Используйте t для перевода
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fitness-center" size={35} color={color} />
          ),
          headerShown: false,
        }}
      >
        {() => <StackFitnessNavigator theme={theme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
