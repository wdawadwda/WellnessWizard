import { GestureResponderEvent } from "react-native";

export interface SlideProps {
  item: { title: string };
  onPress?: (event: GestureResponderEvent) => void;
}
