import { Control, UseFormReturn, useForm } from "react-hook-form";
import * as yup from "yup";
import { type Theme } from "../../../store/theme/theme.type";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { Button } from "../../../shared/ui/Button/Button";
import { t } from "i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { type FormData } from "./bodyFatAnalyzer.type";
import { View } from "react-native";
import { PickerFrom } from "../../../shared/ui/PickerFrom/PickerFrom";
import { getFatLevelDescription } from "../../../entities/utils/analyzers/analyzers.utils";
import { useConst } from "./use/useConst";

export default function BodyFatAnalyzer({ theme }: { theme: Theme }) {
  const { formFields, pickerData } = useConst();
  const { control, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      weight: undefined,
      height: undefined,
      waist: undefined,
      gender: "male",
    },
    resolver: yupResolver(
      yup.object().shape({
        weight: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.isRequired")}`),
        height: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.height")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.height")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.height")} ${t("validation.base.isRequired")}`),
        waist: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.waist")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.waist")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.waist")} ${t("validation.base.isRequired")}`),
        gender: yup.string().required(),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const { weight, height, waist, gender } = data;

    const bmi = weight / (height / 100) ** 2;

    const bodyFatPercentage = getFatLevelDescription(gender, bmi);
    let resultText;

    switch (bodyFatPercentage) {
      case "l":
        resultText = `${t("text.analyzersText.bodyFatAnalyzer.fatLevelTexts.low")}`;
        break;
      case "m":
        resultText = `${t("text.analyzersText.bodyFatAnalyzer.fatLevelTexts.normal")}`;
        break;
      case "h":
        resultText = `${t("text.analyzersText.bodyFatAnalyzer.fatLevelTexts.high")}`;
        break;
      default:
        resultText = `${t("text.analyzersText.bodyFatAnalyzer.fatLevelTexts.unknown")}`;
        break;
    }
    const weightInPounds = weight * 2.20462;
    const waistInInches = waist / 2.54;

    const ymcaBodyFatPercentage =
      gender === "male"
        ? ((4.15 * waistInInches - 0.082 * weightInPounds - 98.42) / weightInPounds) * 100
        : ((4.15 * waistInInches - 0.082 * weightInPounds - 76.76) / weightInPounds) * 100;

    alert(
      `${t("titles.calcResult")}:\n${t("text.analyzersText.product.bmi")}: ${bmi.toFixed(2)}\n${t(
        "text.analyzersText.bodyFatAnalyzer.basedOnBmi",
      )}: ${resultText}\n${t("text.analyzersText.bodyFatAnalyzer.basedOnBmi")}: ${ymcaBodyFatPercentage.toFixed(2)}%`,
    );
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
