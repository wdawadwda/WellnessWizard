import { Content } from "../../shared/Tabs/tabs.types";
import Plasholder from "../../features/Plasholder/Plasholder";
import { RenderTabContentProps } from "../../entities/type/renderTabContent.type";

export const renderTabContent = ({ activeTab, t, theme }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("tabButtonsFoodScreen.calories"):
      return {
        type: "content",
        component: <Plasholder theme={theme}></Plasholder>,
      };
    case t("tabButtonsFoodScreen.analyzers"):
      return { type: "redirect", screen: "Analyzers" };
    default:
      return null;
  }
};
