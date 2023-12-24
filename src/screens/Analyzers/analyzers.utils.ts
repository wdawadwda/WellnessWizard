import { t } from "i18next";

export const getFoodTabs = () => {
  const tabs: string[] = [
    t("analyzersScreenBtn.recipe"),
    t("analyzersScreenBtn.calorie"),
    t("analyzersScreenBtn.bodyFat"),
    t("analyzersScreenBtn.idealWeight"),
    t("analyzersScreenBtn.bodyType"),
  ];

  return { tabs, t };
};
