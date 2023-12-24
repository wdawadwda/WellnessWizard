import { Text } from "react-native";
import { Button } from "../Button/Button";
import { type SlideProps } from "./Splide.type";

export const Slide = ({ item, onPress }: SlideProps) => (
  <Button onPress={onPress}>
    <Text>{item.title}</Text>
  </Button>
);
