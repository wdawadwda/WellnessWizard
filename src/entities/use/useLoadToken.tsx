import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { userActions } from "../../store/user/user.slice";
import { AppDispatch } from "../../store/store.types";

export const useLoadTokens = (dispatch: AppDispatch) => {
  useEffect(() => {
    const loadTokensFromStorage = async () => {
      try {
        const access = await AsyncStorage.getItem("@wellnessWizard/access-token");
        const refresh = await AsyncStorage.getItem("@wellnessWizard/refresh-token");

        if (access !== null && refresh !== null) {
          dispatch(userActions.updateTokens({ access, refresh }));
        }
      } catch (error) {
        console.error("Error reading tokens from AsyncStorage:", error);
      }
    };

    loadTokensFromStorage();
  }, []);
};
