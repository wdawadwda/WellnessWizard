import { t } from "i18next";
import { FormField, PickerDataItem } from "../calorieAnalyzer.type";
import { activityLevel, reductionType } from "../calorieAnalyzer.const";

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "weight",
      label: `${t("text.analyzersText.biometrics.weightFull")}`,
      placeholder: `${t("text.analyzersText.biometrics.weightFull")} (${t("text.analyzersText.product.kg")})`,
      keyboardType: "numeric",
    },
    {
      name: "height",
      label: `${t("text.analyzersText.biometrics.height")}`,
      placeholder: `${t("text.analyzersText.biometrics.height")} (${t("text.analyzersText.product.cm")})`,
      keyboardType: "numeric",
    },
    {
      name: "age",
      label: `${t("text.analyzersText.biometrics.age")}`,
      placeholder: `${t("text.analyzersText.biometrics.age")}`,
      keyboardType: "numeric",
    },
    {
      name: "desiredWeight",
      label: `${t("text.analyzersText.biometrics.desiredWeight")}`,
      placeholder: `${t("text.analyzersText.biometrics.desiredWeight")} (${t("text.analyzersText.product.kg")})`,
      keyboardType: "numeric",
    },
  ];

  const pickerData: PickerDataItem[] = [
    {
      name: "gender",
      label: `${t("text.analyzersText.calorieAnalyzer.selectGender")}`,
      defaultValue: "male",
      items: [
        { label: `${t("text.analyzersText.biometrics.male")}`, value: "male" },
        { label: `${t("text.analyzersText.biometrics.female")}`, value: "female" },
      ],
    },
    {
      name: "reductionType",
      label: `${t("text.analyzersText.calorieAnalyzer.selectConsumption")}`,
      defaultValue: reductionType.light,
      items: [
        { label: `${t("text.analyzersText.calorieAnalyzer.reduce")} 20%`, value: reductionType.light },
        { label: `${t("text.analyzersText.calorieAnalyzer.reduce")} 35%`, value: reductionType.moderate },
        { label: `${t("text.analyzersText.calorieAnalyzer.reduce")} 50%`, value: reductionType.high },
      ],
    },
    {
      name: "activityLevel",
      label: `${t("text.analyzersText.calorieAnalyzer.selectActLevel")}`,
      defaultValue: activityLevel.sedentary,
      items: [
        { label: `${t("text.analyzersText.calorieAnalyzer.activityLevel.sedentary")}`, value: activityLevel.sedentary },
        { label: `${t("text.analyzersText.calorieAnalyzer.activityLevel.light")}`, value: activityLevel.light },
        { label: `${t("text.analyzersText.calorieAnalyzer.activityLevel.moderate")}`, value: activityLevel.moderate },
        { label: `${t("text.analyzersText.calorieAnalyzer.activityLevel.high")}`, value: activityLevel.high },
        { label: `${t("text.analyzersText.calorieAnalyzer.activityLevel.veryHigh")}`, value: activityLevel.veryHigh },
      ],
    },
  ];
  return { formFields, pickerData };
};
