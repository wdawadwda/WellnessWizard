import { Button, Image, ScrollView, Text, View } from "react-native";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { Theme } from "../../../store/theme/theme.type";
import { fontsStyles } from "../../../App";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Home({ theme }: { theme: Theme }) {
  const { t } = useTranslation();

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Layout theme={theme}>
      <ScrollView
        style={[
          theme === "dark"
            ? styles.darkStyles.container
            : styles.lightStyles.container,
          styles.styles.container,
        ]}
      >
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            source={require("../../assets/logo/logo.png")}
          />
        </View>
        <Text
          style={[
            theme === "dark"
              ? styles.darkStyles.text1
              : styles.lightStyles.text1,
            fontsStyles.title,
            { textAlign: "center" },
          ]}
        >
          {t("homeTitle")}
        </Text>
        <Text
          style={[
            theme === "dark"
              ? styles.darkStyles.text1
              : styles.lightStyles.text1,
            fontsStyles.subtitle,
            { textAlign: "center" },
          ]}
        >
          {t("homeTitle")}
        </Text>
        <Text
          style={[
            theme === "dark"
              ? styles.darkStyles.text1
              : styles.lightStyles.text1,
            fontsStyles.text,
            { textAlign: "center" },
          ]}
        >
          {t("homeTitle")}
        </Text>
        <Button title={t("switchLanguage")} onPress={handleLanguageChange} />
      </ScrollView>
    </Layout>
  );
}
