import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import { StatusBar } from "react-native";
import { type Theme } from "../store/theme/theme.type";
import Fitness from "../screens/Fitness/Fitness";
import Food from "../screens/Food/Food";
import * as stylesConstDark from "../entities/const/style/globalDark.style";
import * as stylesConstLight from "../entities/const/style/globalLight.style";
import Analyzers from "../screens/Analyzers/Analyzers";
import RegAuth from "../screens/RegAuth/RegAuth";

const Stack = createNativeStackNavigator();

export const StackNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? stylesConstDark.backgroundColor : stylesConstLight.backgroundColor}
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
      <Stack.Screen
        name="RegAuth"
        options={{
          headerShown: false,
        }}
      >
        {() => <RegAuth theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackFoodNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? stylesConstDark.backgroundColor : stylesConstLight.backgroundColor}
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
      <Stack.Screen
        name="Analyzers"
        options={{
          headerShown: false,
        }}
      >
        {() => <Analyzers theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackFitnessNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? stylesConstDark.backgroundColor : stylesConstLight.backgroundColor}
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
