import { t } from "i18next";

export type FormField = {
  name: string;
  label: string;
  placeholder: string;
  keyboardType: "numeric";
  detailText1: string;
  detailText2: string;
  detail: boolean;
};

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "calories",
      label: `${t("text.analyzersText.calorieControl.settingsKcalPlasholder")}`,
      placeholder: `${t("text.analyzersText.calorieControl.settingsKcalPlasholder")}`,
      keyboardType: "numeric",
      detailText1: `${t("text.analyzersText.calorieControl.settingsKcalDetail")}`,
      detailText2: `${t("text.analyzersText.calorieAnalyzer.resultDesc")}`,
      detail: true,
    },
  ];

  return { formFields };
};
