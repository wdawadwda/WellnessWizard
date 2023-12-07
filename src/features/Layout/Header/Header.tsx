import { View } from "react-native";
import { darkStyles, lightStyles } from "../../../entities/styles/global.style";
import { stylesHeader } from "./header.style";
import { HeaderProps } from "./header.type";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Header = ({ theme }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        theme === "dark" ? darkStyles.container : lightStyles.container,
        stylesHeader.container,
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        {/* <Image
          source={require("../../../assets/logo.png")}
          style={stylesHeader.logo}
        /> */}
      </TouchableOpacity>

      {/* <ToggleTheme theme={theme} /> */}
    </View>
  );
};
