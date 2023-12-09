import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
