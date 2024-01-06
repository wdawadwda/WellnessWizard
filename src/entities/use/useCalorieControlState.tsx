import { useEffect } from "react";
import { useAppSelector, type AppDispatch } from "../../store/store.types";
import { calorieControlActions } from "../../store/calorieControl/calorieControl.slice";
import { selectUser } from "../../store/user/user.selectors";

export const useCalorieControlState = (dispatch: AppDispatch) => {
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && user.id) {
      dispatch(calorieControlActions.setUserId(user.id));
    }
  }, [dispatch, user]);
};
