import { useEffect } from "react";
import { type AppDispatch, useAppSelector } from "../../store/store.types";
import { fetchUser } from "../../store/api/userApi";
import { type JWTTokens } from "../type/api/api.type";
import { selectTokens } from "../../store/user/user.selectors";

export const useAuth = (dispatch: AppDispatch) => {
  const tokens: JWTTokens | null = useAppSelector(selectTokens);
  useEffect(() => {
    if (tokens && tokens.access && tokens.refresh) {
      const { access, refresh } = tokens;
      const promise = dispatch(fetchUser({ accessToken: access, refreshToken: refresh }));
      return () => {
        promise.abort("cancelled");
      };
    }
  }, [dispatch, tokens]);
};
