import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store.types";
import { selectTokens, selectUser } from "../../store/user/user.selectors";
import { fetchUser } from "../../store/api/userApi";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);

  useEffect(() => {
    const promise = dispatch(fetchUser());

    return () => {
      promise.abort("cancelled");
    };
  }, [dispatch, tokens]);
};
