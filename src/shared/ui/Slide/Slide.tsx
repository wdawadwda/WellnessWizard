import { Text } from "react-native";
import { Button } from "../Button/Button";
import { SlideProps } from "./Splide.type";

export const Slide = ({ item, onPress }: SlideProps) => (
  <Button onPress={onPress}>
    <Text>{item.title}</Text>
  </Button>
);
