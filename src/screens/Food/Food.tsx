import { ScrollView } from "react-native";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { type Theme } from "../../store/theme/theme.type";

import { useTabs } from "../../shared/Tabs/useTabs";
import { useRedirectLogic } from "../../shared/Tabs/useRedirectLogic";
import { SliderWithButtons } from "../../shared/Tabs/Tabs";
import { renderTabContent } from "./renderTabContent";
import { useRef } from "react";
import { getFoodTabs } from "./food.utils";

export default function Food({ theme }: { theme: Theme }) {
  const { tabs, t } = getFoodTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(tabs[0]);
  const content = renderTabContent({ activeTab, t, theme });
  const redirectedRef = useRef(false);

  useRedirectLogic({
    content,
    redirectedRef,
    handleTabClick,
    onUnmountValue: null,
  });

  return (
    <Layout theme={theme}>
      <ScrollView style={[styles.styles.container]}>
        <SliderWithButtons activeTab={activeTab} tabs={tabs} handleTabClick={handleTabClick} center={true} />
        {content && content.type === "content" && content.component}
      </ScrollView>
    </Layout>
  );
}
