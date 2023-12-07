import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import { StatusBar } from "react-native";
import { Theme } from "../../store/theme/theme.type";
import Fitness from "../screens/Fitness/Fitness";
import Food from "../screens/Food/Food";

const Stack = createNativeStackNavigator();

export const StackNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? "black" : "white"}
      barStyle={theme === "dark" ? "light-content" : "dark-content"}
    />
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "black" : "white",
        },
        headerTintColor: theme === "dark" ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      >
        {() => <Home theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackFoodNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? "black" : "white"}
      barStyle={theme === "dark" ? "light-content" : "dark-content"}
    />
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "black" : "white",
        },
        headerTintColor: theme === "dark" ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="Food"
        options={{
          headerShown: false,
        }}
      >
        {() => <Food theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackFitnessNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? "black" : "white"}
      barStyle={theme === "dark" ? "light-content" : "dark-content"}
    />
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "black" : "white",
        },
        headerTintColor: theme === "dark" ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="Fitness"
        options={{
          headerShown: false,
        }}
      >
        {() => <Fitness theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);
