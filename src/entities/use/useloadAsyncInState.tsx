import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { userActions } from "../../store/user/user.slice";
import { AppDispatch } from "../../store/store.types";
import { KEYS } from "../const/asyncStorage.const";
import { calorieControlActions } from "../../store/calorieControl/calorieControl.slice";

export const useloadAsyncInState = (dispatch: AppDispatch) => {
  useEffect(() => {
    const loadAsyncInState = async () => {
      try {
        const access = await AsyncStorage.getItem(KEYS.USER.ACCESS_TOKEN);
        const refresh = await AsyncStorage.getItem(KEYS.USER.REFRESH_TOKEN);
        const totalCaloriesFromStorage = await AsyncStorage.getItem(KEYS.CALORIE_CONTROL.TOTAL_CALORIES);
        const amountOfWaterFromStorage = await AsyncStorage.getItem(KEYS.CALORIE_CONTROL.AMOUNT_OF_WATER);
        const waterDrunkIndexFromStorage = await AsyncStorage.getItem(KEYS.CALORIE_CONTROL.WATER_DRUNK_INDEX);

        if (access !== null && refresh !== null) {
          dispatch(userActions.updateTokens({ access, refresh }));
        }
        if (totalCaloriesFromStorage) {
          dispatch(calorieControlActions.setTotalCalories(parseInt(totalCaloriesFromStorage, 10)));
        }
        if (amountOfWaterFromStorage) {
          dispatch(calorieControlActions.setAmountOfWater(parseInt(amountOfWaterFromStorage, 10)));
        }
        if (waterDrunkIndexFromStorage) {
          dispatch(calorieControlActions.setWaterDrunkIndex(parseInt(waterDrunkIndexFromStorage, 10)));
        }
      } catch (error) {
        console.error("Error reading tokens from AsyncStorage:", error);
      }
    };

    loadAsyncInState();
  }, []);
};
