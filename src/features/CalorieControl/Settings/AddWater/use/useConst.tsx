import { t } from "i18next";

export type FormField = {
  name: string;
  label: string;
  placeholder: string;
  keyboardType: "numeric";
};

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "water",
      label: `${t("text.analyzersText.calorieControl.settingsAddWaterPlasholder")}`,
      placeholder: `${t("text.analyzersText.calorieControl.settingsAddWaterPlasholder")}`,
      keyboardType: "numeric",
    },
  ];

  return { formFields };
};
