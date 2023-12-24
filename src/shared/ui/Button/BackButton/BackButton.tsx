import { AntDesign } from "@expo/vector-icons";
import { Button } from "../Button";
import { type BackButtonProps } from "./backButton.type";
import { StyleSheet } from "react-native";
import { backgroundColorSecond, textColor } from "../../../../entities/const/style/globalDark.style";

export const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <Button onPress={onPress} style={[styles.buttonContainer]}>
      <AntDesign name="arrowleft" size={25} color={textColor} />
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: backgroundColorSecond,
  },
});
