import { View } from "react-native";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { PickerFrom } from "../../../shared/ui/PickerFrom/PickerFrom";
import { Control, UseFormReturn, useForm } from "react-hook-form";
import { Button } from "../../../shared/ui/Button/Button";
import { Theme } from "../../../../store/theme/theme.type";
import * as yup from "yup";
import { t } from "i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConst } from "./use/useConst";
import { FormData } from "./bodyType.type";

export default function BodyType({ theme }: { theme: Theme }) {
  const { formFields, pickerData } = useConst();
  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      wristCircumference: undefined,
      gender: "male",
    },
    resolver: yupResolver(
      yup.object().shape({
        wristCircumference: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.wristCircumference")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.wristCircumference")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.wristCircumference")} ${t("validation.base.isRequired")}`),
        gender: yup.string().required(),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const { wristCircumference, gender } = data;

    let bodyType = "";

    if (gender === "male") {
      if (wristCircumference < 18) {
        bodyType = t("text.analyzersText.bodyTypes.asthenic");
      } else if (wristCircumference >= 18 && wristCircumference <= 20) {
        bodyType = t("text.analyzersText.bodyTypes.normosthenic");
      } else {
        bodyType = t("text.analyzersText.bodyTypes.hypersthenic");
      }
    } else if (gender === "female") {
      if (wristCircumference < 15) {
        bodyType = t("text.analyzersText.bodyTypes.asthenic");
      } else if (wristCircumference >= 15 && wristCircumference <= 17) {
        bodyType = t("text.analyzersText.bodyTypes.normosthenic");
      } else {
        bodyType = t("text.analyzersText.bodyTypes.hypersthenic");
      }
    }

    alert(`${t("text.analyzersText.bodyType")}: ${bodyType}`);
  };

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <PickerFrom
        pickerData={pickerData}
        control={control as unknown as Control}
        setValue={setValue as unknown as UseFormReturn["setValue"]}
        theme={theme}
      />
      <Button style={{ marginTop: 10 }} disabled={!formState.isValid} onPress={handleSubmit(onSubmit)}>
        {t("buttonsTitles.calculate")}
      </Button>
    </View>
  );
}
