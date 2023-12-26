import { Pressable, StyleSheet, Text } from "react-native";

import { type ButtonProps } from "./button.type";
import { backgroundColorSecond, textColor } from "../../../entities/const/style/globalDark.style";

export const Button = ({ children, onPress, style, disabled }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.6 : 1,
        },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: backgroundColorSecond,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: textColor,
    textTransform: "uppercase",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
