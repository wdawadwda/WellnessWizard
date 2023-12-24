import { View } from "react-native";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { PickerFrom } from "../../../shared/ui/PickerFrom/PickerFrom";
import { Control, UseFormReturn, useForm } from "react-hook-form";
import { Button } from "../../../shared/ui/Button/Button";
import { useConst } from "./use/useConst";
import { type Theme } from "../../../store/theme/theme.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { t } from "i18next";
import { type FormData } from "./idealWt.type";
import {
  calculateIdealWeightDevine,
  calculateIdealWeightLorenz,
  calculateIdealWeightBMI,
} from "../../../entities/utils/analyzers/analyzers.utils";

export default function IdealWeight({ theme }: { theme: Theme }) {
  const { formFields, pickerData } = useConst();
  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      height: undefined,
      gender: "male",
    },
    resolver: yupResolver(
      yup.object().shape({
        height: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.height")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.height")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.height")} ${t("validation.base.isRequired")}`),
        gender: yup.string().required(),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const { height, gender } = data;

    const idealWeightDevine = calculateIdealWeightDevine(height, gender);
    const idealWeightLorenz = calculateIdealWeightLorenz(height, gender);
    const idealWeightBMI = calculateIdealWeightBMI(height, gender);

    const alertMessage = t("text.analyzersText.idealWeightAlert", {
      idealWeightDevine: idealWeightDevine.toFixed(2),
      idealWeightLorenz: idealWeightLorenz.toFixed(2),
      idealWeightBMI: idealWeightBMI.toFixed(2),
    });
    alert(alertMessage);
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
