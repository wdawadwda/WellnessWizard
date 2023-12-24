import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userActions } from "./user.slice";
import { updateTokens } from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type JWTTokens } from "../../entities/type/api/api.type";
import { createTokens } from "../api/userApi";

export const listenerMiddlewareUser = createListenerMiddleware();

listenerMiddlewareUser.startListening({
  matcher: createTokens.fulfilled.match,
  effect: async ({ payload }: { payload: JWTTokens }) => {
    try {
      await AsyncStorage.setItem("@wellnessWizard/access-token", payload.access);
      await AsyncStorage.setItem("@wellnessWizard/refresh-token", payload.refresh);
    } catch (error) {
      console.error("Error saving tokens to AsyncStorage:", error);
    }
  },
});

listenerMiddlewareUser.startListening({
  matcher: createTokens.fulfilled.match,
  effect: ({ payload }: { payload: JWTTokens }) => {
    updateTokens(payload);
  },
});

listenerMiddlewareUser.startListening({
  matcher: userActions.logout.match,
  effect: async () => {
    try {
      await AsyncStorage.removeItem("@wellnessWizard/access-token");
      await AsyncStorage.removeItem("@wellnessWizard/refresh-token");
    } catch (error) {
      console.error("Error removing tokens from AsyncStorage:", error);
    }
  },
});
