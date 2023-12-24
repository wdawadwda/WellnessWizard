import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosCore, { type AxiosError, type AxiosResponse } from "axios";
import { type Access, type JWTTokens } from "../../entities/type/api/api.type";
import { BASE_URL } from "../../entities/const/api/urls";

export const axiosAuthorizationInstance = axiosCore.create();

export let accessToken = await AsyncStorage.getItem("@wellnessWizard/access-token");
export const refreshToken = await AsyncStorage.getItem("@wellnessWizard/refresh-token");

export function updateTokens(payload: JWTTokens) {
  accessToken = payload.access;
}

const MAX_RETRY_ATTEMPTS = 1;

let retryCount = 0;

const handleRequestError = async (error: AxiosError) => {
  if (error.response && error.response.status === 401 && refreshToken && retryCount < MAX_RETRY_ATTEMPTS) {
    retryCount++;
    try {
      const { data } = await axiosAuthorizationInstance.post<Access>(`${BASE_URL}/api/v1/token/refresh/`, {
        refresh: refreshToken,
      });
      const newAccessToken = data.access;
      await AsyncStorage.setItem("@wellnessWizard/access-token", newAccessToken);
      accessToken = newAccessToken;
      const originalRequest = error.config;
      if (originalRequest) {
        return axiosAuthorizationInstance(originalRequest);
      } else {
        throw new Error("Оригинальный запрос не найден");
      }
    } catch (refreshError) {
      await AsyncStorage.removeItem("@wellnessWizard/access-token");
      await AsyncStorage.removeItem("@wellnessWizard/refresh-token");
      throw refreshError;
    }
  }
  throw error;
};

axiosAuthorizationInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => handleRequestError(error),
);

axiosAuthorizationInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosAuthorizationInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => handleRequestError(error),
);
