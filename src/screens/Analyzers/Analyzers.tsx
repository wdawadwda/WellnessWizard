import { ScrollView, Text } from "react-native";
import { type Theme } from "../../store/theme/theme.type";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { BackButton } from "../../shared/ui/Button/BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";
import { getFoodTabs } from "./analyzers.utils";
import { useTabs } from "../../shared/Tabs/useTabs";
import { renderTabContent } from "./renderTabContent";
import { SliderWithButtons } from "../../shared/Tabs/Tabs";

export default function Analyzers({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const { tabs, t } = getFoodTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(tabs[0]);
  const content = renderTabContent({ activeTab, t, theme });

  return (
    <Layout theme={theme}>
      <ScrollView style={[styles.styles.container]}>
        <BackButton onPress={() => navigation.goBack()}></BackButton>
        <Text style={[styles.commonTextStyle(theme, "text1", "title")]}>{t("tabButtonsFoodScreen.analyzers")}</Text>
        <SliderWithButtons activeTab={activeTab} tabs={tabs} handleTabClick={handleTabClick} center={false} />
        {content && content.type === "content" && content.component}
      </ScrollView>
    </Layout>
  );
}
