import { View } from "react-native";
import { type Theme } from "../../store/theme/theme.type";
import { type Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { t } from "i18next";
import { Button } from "../../shared/ui/Button/Button";
import { InputForm } from "../../shared/ui/InputForm/InputForm";
import Loader from "../../shared/ui/Loader/Loader";
import { useAppDispatch } from "../../store/store.types";
import { useConst } from "./use/useConst";
import { createTokens } from "../../store/api/userApi";
import { useSelector } from "react-redux";
import { selectError, selectTokensStatus } from "../../store/user/user.selectors";
import { UserRequest } from "../../entities/type/api/api.type";
import { MessForm } from "../../shared/MessForm/MessForm";

export default function Auth({ theme }: { theme: Theme }) {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);
  const tokensStatus = useSelector(selectTokensStatus);
  const { formFields } = useConst({});
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .required(`${t("validation.regAuth.login.usernameRequired")}`)
          .min(3, t("validation.regAuth.reg.usernameMinLength", { min: 3 })),
        email: yup
          .string()
          .email(`${t("validation.regAuth.reg.emailInvalid")}`)
          .required(`${t("validation.regAuth.reg.emailRequired")}`),
        password: yup
          .string()
          .required(`${t("validation.regAuth.login.passwordRequired")}`)
          .min(6, t("validation.regAuth.reg.passwordMinLength", { min: 6 }))
          .matches(/[A-Za-zЁА-яё]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/[A-ZЁА-Я]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/[a-zа-яё]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/\d/, `${t("validation.regAuth.reg.passwordInvalid")}`),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = async ({ username, email, password }: UserRequest) => {
    try {
      dispatch(createTokens({ username, email, password }));
    } catch (error) {
      console.error("Error while dispatching createTokens:", error);
    }
  };

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      {tokensStatus === "loading" && <Loader size={25}></Loader>}
      {tokensStatus === "error" && (
        <>{error ? <MessForm message={{ detail: error?.detail }} status={tokensStatus} theme={theme} /> : null}</>
      )}
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button
        style={{ marginTop: 10 }}
        disabled={!formState.isValid || tokensStatus === "loading"}
        onPress={handleSubmit(onSubmit)}
      >
        {t("buttonsTitles.regAuth.reg")}
      </Button>
    </View>
  );
}
