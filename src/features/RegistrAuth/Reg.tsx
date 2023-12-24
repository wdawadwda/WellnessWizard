import { Text, View } from "react-native";
import { type Theme } from "../../store/theme/theme.type";
import { t } from "i18next";
import { Button } from "../../shared/ui/Button/Button";
import { InputForm } from "../../shared/ui/InputForm/InputForm";
import * as yup from "yup";
import { type Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConst } from "./use/useConst";
import { registerUser } from "../../store/api/userApi";
import { type UserRequest } from "../../entities/type/api/api.type";
import * as styles from "../../entities/styles/global.style";
import { useState } from "react";
import { AxiosError } from "axios";
import Loader from "../../shared/ui/Loader/Loader";
import { MessForm } from "../../shared/MessagesForm/MessForm";

export default function Reg({ theme }: { theme: Theme }) {
  const { formFields } = useConst({ reg: true });
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
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
        repeatPassword: yup
          .string()
          .oneOf([yup.ref("password"), undefined], `${t("validation.regAuth.reg.repeatPasswordMatch")}`)
          .required(`${t("validation.regAuth.reg.repeatPasswordRequired")}`),
      }),
    ),
    mode: "onChange",
  });

  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<(UserRequest & { defaultAxios: string }) | null>(null);

  const onSubmit = async ({ username, email, password }: UserRequest) => {
    setRegistrationStatus("loading");
    try {
      await registerUser({ username, email, password });
      setRegistrationStatus("success");
      setRegistrationError(null);
    } catch (error) {
      const axiosError = error as AxiosError<UserRequest>;
      setRegistrationStatus("error");
      const errorMessage = axiosError.response?.data || { email: "", password: "", username: "" };
      const defaultMessage = axiosError.message;
      setRegistrationError({
        email: errorMessage.email || "",
        password: errorMessage.password || "",
        username: errorMessage.username || "",
        defaultAxios: defaultMessage,
      });
    }
  };

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      {registrationStatus === "loading" && <Loader size={25}></Loader>}
      {registrationStatus === "success" && (
        <View style={[styles.darkStyles.containerSuccess, { marginBottom: 5 }]}>
          <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>Регистрация успешна!</Text>
        </View>
      )}
      {registrationStatus === "error" && (
        <MessForm message={registrationError || {}} status={registrationStatus} theme={theme} />
      )}
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button
        style={{ marginTop: 10 }}
        disabled={!formState.isValid || registrationStatus === "loading"}
        onPress={handleSubmit(onSubmit)}
      >
        {t("buttonsTitles.regAuth.reg")}
      </Button>
    </View>
  );
}
