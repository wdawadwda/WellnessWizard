import { type Content } from "../../shared/Tabs/tabs.types";
import { type RenderTabContentProps } from "../../entities/type/renderTabContent.type";
import CalorieControl from "../../features/CalorieControl/CalorieControl";

export const renderTabContent = ({ activeTab, t, theme }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("tabButtonsFoodScreen.calories"):
      return {
        type: "content",
        component: <CalorieControl theme={theme}></CalorieControl>,
      };
    case t("tabButtonsFoodScreen.analyzers"):
      return { type: "redirect", screen: "Analyzers" };
    default:
      return null;
  }
};
