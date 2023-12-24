import Loader from "../ui/Loader/Loader";
import * as styles from "../../entities/styles/global.style";
import { View } from "react-native";
import { Theme } from "../../store/theme/theme.type";

export const LoaderFetchUser = ({ theme }: { theme: Theme }) => {
  return (
    <View
      style={[theme === "dark" ? styles.darkStyles.container : styles.lightStyles.container, styles.styles.container]}
    >
      <Loader size={100} />
    </View>
  );
};
