import { type Content } from "../../shared/Tabs/tabs.types";
import { type RenderTabContentProps } from "../../entities/type/renderTabContent.type";
import Auth from "../../features/RegistrAuth/Auth";
import Reg from "../../features/RegistrAuth/Reg";

export const renderTabContent = ({ activeTab, t, theme }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("buttonsTitles.regAuth.login"):
      return {
        type: "content",
        component: <Auth theme={theme}></Auth>,
      };
    case t("buttonsTitles.regAuth.reg"):
      return {
        type: "content",
        component: <Reg theme={theme}></Reg>,
      };
    default:
      return null;
  }
};
