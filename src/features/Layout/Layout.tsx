import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./Header/Header";
import { View } from "react-native";
import { darkStyles, styles, lightStyles } from "../../entities/styles/global.style";
import { LayoutProps } from "./layout.type";

export const Layout = ({ children, theme }: LayoutProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[theme === "dark" ? darkStyles.container : lightStyles.container, styles.container]}>
        <Header theme={theme} />
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};
