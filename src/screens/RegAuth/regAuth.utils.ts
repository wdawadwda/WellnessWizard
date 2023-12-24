import { t } from "i18next";

export const getUserTabs = () => {
  const tabs: string[] = [t("buttonsTitles.regAuth.login"), t("buttonsTitles.regAuth.reg")];

  return { tabs, t };
};
