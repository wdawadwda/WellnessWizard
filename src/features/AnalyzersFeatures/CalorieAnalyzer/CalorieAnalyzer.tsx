import { t } from "i18next";
import { View } from "react-native";
import { Theme } from "../../../../store/theme/theme.type";
import { Button } from "../../../shared/ui/Button/Button";
import { Control, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateBMR, calculateDaysToReachGoal } from "../../../entities/utils/analyzers/analyzers.utils";
import { CalorieAnalyzerFormData } from "./calorieAnalyzer.type";
import * as yup from "yup";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { PickerFrom } from "../../../shared/ui/PickerFrom/PickerFrom";
import { useConst } from "./use/useConst";

export default function CalorieAnalyzer({ theme }: { theme: Theme }) {
  const { formFields, pickerData } = useConst();
  const { control, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      weight: undefined,
      height: undefined,
      age: undefined,
      gender: "male",
      activityLevel: 1.2,
      desiredWeight: undefined,
      reductionType: 0.25,
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
        age: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.age")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.age")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.age")} ${t("validation.base.isRequired")}`),
        gender: yup.string().required(),
        activityLevel: yup.number().required(),
        desiredWeight: yup
          .number()
          .typeError(`${t("text.analyzersText.desiredWeight")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.desiredWeight")} ${t("validation.base.cannotBeZero")}`)
          .max(yup.ref("weight"), `${t("validation.calorieSchema.desWeightMust")}`)
          .required(`${t("text.analyzersText.desiredWeight")} ${t("validation.base.isRequired")}`),
        reductionType: yup.number().required(),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: CalorieAnalyzerFormData) => {
    const { weight, height, age, gender, activityLevel, desiredWeight, reductionType } = data;

    const basalMetabolicRate = calculateBMR({
      weight: weight,
      height: height,
      age: age,
      gender: gender,
    });

    const dailyCalories = basalMetabolicRate * activityLevel;

    const caloriesForSafeWeightLoss = dailyCalories - reductionType * dailyCalories;

    const daysToReachGoal = calculateDaysToReachGoal({
      weight: weight,
      desiredWeight: desiredWeight,
      dailyCalories,
      caloriesForSafeWeightLoss,
    });

    alert(
      `${t("text.analyzersText.calorieAnalyzer.resultDesc")}
      \n${t("text.analyzersText.calorieAnalyzer.dailyCalories")}: ${dailyCalories.toFixed(1)} 
      \n${t("text.analyzersText.calorieAnalyzer.calSafeWeightLoss")}: ${caloriesForSafeWeightLoss.toFixed(1)} ${t(
        "text.analyzersText.product.calories",
      )}\n${t("text.analyzersText.calorieAnalyzer.numberOfFays")}: ${daysToReachGoal}`,
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
