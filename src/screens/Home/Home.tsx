import { ScrollView, Text } from "react-native";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { Theme } from "../../../store/theme/theme.type";
import { fontsStyles } from "../../../App";

export default function Home({ theme }: { theme: Theme }) {
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
        <Text
          style={[
            theme === "dark"
              ? styles.darkStyles.text1
              : styles.lightStyles.text1,
            fontsStyles.title,
            { textAlign: "center" },
          ]}
        >
          Главная
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
          Главная
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
          Главная
        </Text>
      </ScrollView>
    </Layout>
  );
}
