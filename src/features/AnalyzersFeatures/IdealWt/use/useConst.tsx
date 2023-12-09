import { t } from "i18next";
import { FormField, PickerDataItem } from "../idealWt.type";

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "height",
      label: `${t("text.analyzersText.biometrics.height")}`,
      placeholder: `${t("text.analyzersText.biometrics.height")} (${t("text.analyzersText.product.cm")})`,
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
  ];
  return { formFields, pickerData };
};
