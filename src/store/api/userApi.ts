import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import axiosCore from "axios";

import { createErrorObject } from "./api.utils";
import { axiosAuthorizationInstance } from "./axiosInstance";
import { userActions } from "../user/user.slice";
import { BASE_URL } from "../../entities/const/api/urls";
import { type User, type ErrorDetail, type UserRequest, type JWTTokens } from "../../entities/type/api/api.type";

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

export const fetchUser = createAsyncThunk("user/fetch", async function (_, thunkAPI) {
  const { data } = await axiosAuthorizationInstance.get<User>(`${BASE_URL}/auth/users/me/`, {
    signal: thunkAPI.signal,
  });

  return data;
});
