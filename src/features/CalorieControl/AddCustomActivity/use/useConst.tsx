import { t } from "i18next";

export interface FormField {
  name: "exercise" | "calories";
  placeholder: string;
  label: string;
  keyboardType: "numeric" | "default";
}

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "exercise",
      label: `${t("text.analyzersText.calorieControl.meals.exercise")}`,
      placeholder: `${t("text.analyzersText.calorieControl.activity.activityPlasholder")}`,
      keyboardType: "default",
    },
    {
      name: "calories",
      label: `${t("text.analyzersText.product.calories")}`,
      placeholder: ``,
      keyboardType: "numeric",
    },
  ];
  return { formFields };
};
