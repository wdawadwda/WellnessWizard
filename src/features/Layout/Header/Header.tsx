import { Image, View } from "react-native";
import { darkStyles, lightStyles } from "../../../entities/styles/global.style";
import { stylesHeader } from "./header.style";
import { HeaderProps } from "./header.type";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToggleTheme } from "../../../ui/ToggleTheme/ToggleTheme";
import { LangSwitcher } from "../../../ui/langSwitcher/langSwitcher";

export const Header = ({ theme }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        theme === "dark" ? darkStyles.container : lightStyles.container,
        stylesHeader.container,
      ]}
    >
      <TouchableOpacity
        style={stylesHeader.logoWrapper}
        onPress={() => navigation.navigate("Home" as never)}
      >
        <Image
          style={stylesHeader.logo}
          source={require("../../../assets/logo/logo.png")}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <LangSwitcher theme={theme} />
        <ToggleTheme theme={theme} />
      </View>
    </View>
  );
};
