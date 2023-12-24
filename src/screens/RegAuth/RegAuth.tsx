import { ScrollView, Text } from "react-native";
import { SliderWithButtons } from "../../shared/Tabs/Tabs";
import { useTabs } from "../../shared/Tabs/useTabs";
import { type Theme } from "../../store/theme/theme.type";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { renderTabContent } from "./renderTabContent";
import { getUserTabs } from "./regAuth.utils";

export default function RegAuth({ theme }: { theme: Theme }) {
  const { tabs, t } = getUserTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(null);
  const content = renderTabContent({ activeTab, t, theme });

  return (
    <Layout theme={theme}>
      <Text style={[styles.commonTextStyle(theme, "text1", "title")]}>{`${t("buttonsTitles.regAuth.login")} / ${t(
        "buttonsTitles.regAuth.reg",
      )}`}</Text>
      <ScrollView
        style={[theme === "dark" ? styles.darkStyles.container : styles.lightStyles.container, styles.styles.container]}
      >
        <SliderWithButtons
          activeTab={activeTab}
          tabs={tabs}
          handleTabClick={handleTabClick}
          center={true}
          fixedWidth={true}
        />
        {content && content.type === "content" && content.component}
      </ScrollView>
    </Layout>
  );
}
