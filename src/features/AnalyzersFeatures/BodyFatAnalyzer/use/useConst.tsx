import { t } from "i18next";
import { FormField, PickerData } from "../bodyFatAnalyzer.type";

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
      name: "waist",
      label: `${t("text.analyzersText.biometrics.waist")}`,
      placeholder: `${t("text.analyzersText.biometrics.waist")} (${t("text.analyzersText.product.cm")})`,
      keyboardType: "numeric",
    },
  ];
  const pickerData: PickerData[] = [
    {
      name: "gender",
      label: `${t("text.analyzersText.calorieAnalyzer.selectGender")}`,
      defaultValue: "male",
      items: [
        { label: `${t("text.analyzersText.biometrics.male")}`, value: "male" },
        { label: `${t("text.analyzersText.biometrics.female")}`, value: "female" },
      ],
    },
  ];
  return { formFields, pickerData };
};
