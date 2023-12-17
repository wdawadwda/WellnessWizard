import { ScrollView, View } from "react-native";
import * as styles from "../../entities/styles/global.style";
import { Layout } from "../../features/Layout/Layout";
import { Theme } from "../../../store/theme/theme.type";

export default function Home({ theme }: { theme: Theme }) {
  return (
    <Layout theme={theme}>
      <ScrollView
        style={[theme === "dark" ? styles.darkStyles.container : styles.lightStyles.container, styles.styles.container]}
      >
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </ScrollView>
    </Layout>
  );
}
