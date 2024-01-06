import { Button } from "../Button";
import { StyleSheet } from "react-native";
import { ExtraButtonsType } from "../../../../entities/type/extraButton.type";

export const DetailButton = ({ onPress }: ExtraButtonsType) => {
  return (
    <>
      <Button onPress={onPress} style={[style.buttonContainer]}>
        ?
      </Button>
    </>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    width: 25,
    height: 25,
    borderColor: "white",
    borderWidth: 1,
    padding: 0,
    backgroundColor: "inherit",
  },
});
