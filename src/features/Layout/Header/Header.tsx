import { Image, View } from "react-native";
import { darkStyles, lightStyles } from "../../../entities/styles/global.style";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToggleTheme } from "../../../shared/ui/ToggleTheme/ToggleTheme";
import { LangSwitcher } from "../../../shared/ui/LangSwitcher/LangSwitcher";

export const Header = ({ theme }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[theme === "dark" ? darkStyles.container : lightStyles.container, stylesHeader.container]}>
      <TouchableOpacity style={stylesHeader.logoWrapper} onPress={() => navigation.navigate("Home" as never)}>
        <Image style={stylesHeader.logo} source={require("../../../assets/logo/logo.png")} />
      </TouchableOpacity>
      <View style={stylesHeader.switchersWrapper}>
        <LangSwitcher theme={theme} />
        <ToggleTheme theme={theme} />
      </View>
    </View>
  );
};
