import { type Content } from "../../../shared/Tabs/tabs.types";
import { type RenderTabContentProps } from "../../../entities/type/renderTabContent.type";
import RecipeAnalyzer from "../../../features/AnalyzersFeatures/RecipeAnalyzer/RecipeAnalyzer";
import CalorieAnalyzer from "../../../features/AnalyzersFeatures/CalorieAnalyzer/CalorieAnalyzer";
import BodyFatAnalyzer from "../../../features/AnalyzersFeatures/BodyFatAnalyzer/BodyFatAnalyzer";
import IdealWeight from "../../../features/AnalyzersFeatures/IdealWt/IdealWt";
import BodyType from "../../../features/AnalyzersFeatures/BodyType/BodyType";

export const renderTabContent = ({ activeTab, t, theme }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("analyzersScreenBtn.recipe"):
      return {
        type: "content",
        component: <RecipeAnalyzer theme={theme}></RecipeAnalyzer>,
      };
    case t("analyzersScreenBtn.calorie"):
      return {
        type: "content",
        component: <CalorieAnalyzer theme={theme}></CalorieAnalyzer>,
      };
    case t("analyzersScreenBtn.bodyFat"):
      return {
        type: "content",
        component: <BodyFatAnalyzer theme={theme}></BodyFatAnalyzer>,
      };
    case t("analyzersScreenBtn.idealWeight"):
      return {
        type: "content",
        component: <IdealWeight theme={theme}></IdealWeight>,
      };
    case t("analyzersScreenBtn.bodyType"):
      return {
        type: "content",
        component: <BodyType theme={theme}></BodyType>,
      };
    default:
      return null;
  }
};
