import { t } from "i18next";
import { FormField } from "../addCustomProduct.type";

export const useConst = () => {
  const formFields: FormField[] = [
    {
      name: "product",
      label: `${t("text.analyzersText.product.inputTitle.product")}`,
      placeholder: `${t("text.analyzersText.calorieControl.custoProd.productPlasholder")}`,
      keyboardType: "default",
    },
    {
      name: "weight",
      label: `${t("text.analyzersText.biometrics.weightFull")}`,
      placeholder: `${t("text.analyzersText.product.gramm")}`,
      keyboardType: "numeric",
    },
    {
      name: "calories",
      label: `${t("text.analyzersText.product.calories")}`,
      placeholder: ``,
      keyboardType: "numeric",
    },
    {
      name: "carbs",
      label: `${t("text.analyzersText.product.carbohydrates")}`,
      placeholder: `${t("validation.base.optional")}`,
      keyboardType: "numeric",
    },
    {
      name: "fat",
      label: `${t("text.analyzersText.product.fat")}`,
      placeholder: `${t("validation.base.optional")}`,
      keyboardType: "numeric",
    },
    {
      name: "protein",
      label: `${t("text.analyzersText.product.protein")}`,
      placeholder: `${t("validation.base.optional")}`,
      keyboardType: "numeric",
    },
  ];
  return { formFields };
};
