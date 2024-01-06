import { RootState } from "../store.types";

export const selectcalorieControlSavedData = (state: RootState) => state.calorieControlSaved.data;

export const selectcalorieControlSavedStatus = (state: RootState) => state.calorieControlSaved.status;
