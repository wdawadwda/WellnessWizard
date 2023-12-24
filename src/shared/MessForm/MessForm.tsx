import { Text, View } from "react-native";
import { type MessFormProperties } from "./messForm.type";
import * as styles from "../../entities/styles/global.style";

export const MessForm = ({ message, status, theme }: MessFormProperties) => {
  console.log(message);
  return (
    <View
      style={
        status === "error"
          ? [styles.darkStyles.containerAlert, { marginBottom: 5 }]
          : [styles.darkStyles.containerSuccess, { marginBottom: 5 }]
      }
    >
      {message.defaultAxios && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{message.defaultAxios}</Text>
      )}
      {message.username && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{message.username}</Text>
      )}
      {message.email && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{message.email}</Text>
      )}
      {message.password && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{message.password}</Text>
      )}
      {message.successMessage && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>
          {message.successMessage}
        </Text>
      )}
      {message.detail && (
        <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>{message.detail}</Text>
      )}
    </View>
  );
};
