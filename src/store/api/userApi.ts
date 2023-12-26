import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import axiosCore from "axios";

import { BASE_URL } from "../../entities/const/api/urls";
import { type User, type ErrorDetail, type UserRequest, type JWTTokens } from "../../entities/type/api/api.type";
import { createErrorObject } from "../../entities/utils/api/api.utils";
import { userActions } from "../user/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS } from "../../entities/const/asyncStorage.const";

export async function registerUser(signUpData: UserRequest) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/users/`, signUpData);
    return response.data;
  } catch (error: unknown) {
    const errors = error;
    throw errors;
  }
}

export const createTokens = createAsyncThunk<
  JWTTokens,
  UserRequest,
  {
    rejectValue: ErrorDetail;
  }
>("user/createTokens", async function (payload: UserRequest, thunkAPI) {
  try {
    const response = await axiosCore.post<JWTTokens, AxiosResponse<JWTTokens>, UserRequest>(
      `${BASE_URL}/api/v1/token/`,
      payload,
      {
        signal: thunkAPI.signal,
      },
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorDetail>);
    thunkAPI.dispatch(userActions.setError(errorObject));
    throw error;
  }
});

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async function ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }, thunkAPI) {
    try {
      const { data } = await axios.get<User>(`${BASE_URL}/auth/users/me/`, {
        signal: thunkAPI.signal,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 401) {
          // Если статус 401, обновить токен
          try {
            // запрос на сервер для обновления токена
            const refreshResponse = await axios.post(`${BASE_URL}/api/v1/token/refresh/`, {
              refresh: refreshToken,
            });

            // новый токен из ответа сервера
            const newAccessToken = refreshResponse.data.access;
            await AsyncStorage.setItem(KEYS.USER.ACCESS_TOKEN, newAccessToken);
            // запрос с новым токеном
            const { data } = await axios.get<User>(`${BASE_URL}/auth/users/me/`, {
              signal: thunkAPI.signal,
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
            return data;
          } catch (refreshError) {
            if (axios.isAxiosError(refreshError)) {
              // Если обновление токена не удалось
              userActions.logout();
              return thunkAPI.rejectWithValue(refreshError.response?.data);
            } else {
              // если ошибки не относятся к AxiosError
              throw refreshError;
            }
          }
        } else {
          return thunkAPI.rejectWithValue(response?.data);
        }
      } else {
        //  типы ошибок, если это не AxiosError
        throw error;
      }
    }
  },
);
