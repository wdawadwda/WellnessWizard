import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./rootReduser";

import { listenerMiddlewareUser } from "./user/user.listeners";
import { listenerMiddlewareCalorieControl } from "./calorieControl/calorieControl.listeners";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddlewareUser.middleware)
      .prepend(listenerMiddlewareCalorieControl.middleware),
});
