import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ErrorObject, type UserSlice } from "./user.types";
import { createTokens, fetchUser } from "../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type JWTTokens } from "../../entities/type/api/api.type";

const getInitialState = async (): Promise<UserSlice> => {
  try {
    const access = await AsyncStorage.getItem("@wellnessWizard/access-token");
    const refresh = await AsyncStorage.getItem("@wellnessWizard/refresh-token");

    return {
      currentUser: { status: "idle" },
      tokens: access && refresh ? { status: "success", data: { access, refresh } } : { status: "idle" },
      error: null,
    };
  } catch (error) {
    console.error("Error reading tokens from AsyncStorage:", error);
    throw error;
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: await getInitialState(),
  reducers: {
    logout: (state) => {
      state.currentUser = { status: "idle" };
      state.tokens = { status: "idle" };
    },
    setError: (state, action: PayloadAction<ErrorObject | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.currentUser = { status: "loading" };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // state.currentUser = { status: "success", data: action.payload };
      if (state.tokens.status === "idle") {
        state.currentUser = { status: "idle", data: null };
      } else {
        state.currentUser = { status: "success", data: action.payload };
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        return;
      }
      state.currentUser = {
        status: "error",
        error: action.error.message || "Something went wrong",
      };
    });

    builder.addCase(createTokens.pending, (state) => {
      state.tokens = { status: "loading" };
    });
    builder.addCase(createTokens.fulfilled, (state, action: PayloadAction<JWTTokens>) => {
      state.tokens = { status: "success", data: action.payload };
    });
    builder.addCase(createTokens.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        return;
      }
      state.tokens = {
        status: "error",
        error: action.error.message || "Something went wrong",
      };
    });
  },
});

export const { actions: userActions } = userSlice;
