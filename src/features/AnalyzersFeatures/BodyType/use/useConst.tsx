import { t } from "i18next";
import { type FormField, type PickerDataItem } from "../bodyType.type";

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "wristCircumference",
      label: `${t("text.analyzersText.biometrics.wristCircumference")}`,
      placeholder: `${t("text.analyzersText.product.cm")}`,
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
