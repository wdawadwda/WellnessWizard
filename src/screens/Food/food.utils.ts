import { t } from "i18next";

export const getFoodTabs = () => {
  const tabs: string[] = [t("tabButtonsFoodScreen.calories"), t("tabButtonsFoodScreen.analyzers")];

  return { tabs, t };
};
