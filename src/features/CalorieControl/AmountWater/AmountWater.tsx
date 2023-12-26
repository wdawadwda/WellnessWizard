import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { textColor2, textSecondColor } from "../../../entities/const/style/globalDark.style";
import { Button } from "../../../shared/ui/Button/Button";
import { type AmountWaterProps } from "./amountWater.type";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store.types";
import { calorieControlActions } from "../../../store/calorieControl/calorieControl.slice";
import { KEYS } from "../../../entities/const/asyncStorage.const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { selectWaterDrunkIndex } from "../../../store/calorieControl/calorieControl.selectors";

export default function AmountWater({ amountOfWater }: AmountWaterProps) {
  const [selectedWaterIndex, setSelectedWaterIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const waterDrunkIndex = useSelector(selectWaterDrunkIndex);

  useEffect(() => {
    setSelectedWaterIndex(waterDrunkIndex);
  }, [waterDrunkIndex]);

  const onSelectWater = async (index: number | null) => {
    setSelectedWaterIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;
      dispatch(calorieControlActions.setWaterDrunkIndex(newIndex));
      AsyncStorage.setItem(KEYS.CALORIE_CONTROL.WATER_DRUNK_INDEX, String(newIndex)).catch((error) => {
        console.error("Error saving water drunk index to AsyncStorage:", error);
      });
      return newIndex;
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
      {Array.from({ length: amountOfWater }).map((_, index) => (
        <Button
          key={index}
          onPress={() => onSelectWater(index)}
          style={{
            backgroundColor: "inherit",
          }}
        >
          <Ionicons
            name="water"
            size={45}
            color={selectedWaterIndex !== null && index <= selectedWaterIndex ? textSecondColor : textColor2}
            style={{
              marginRight: 5,
            }}
          />
        </Button>
      ))}
    </View>
  );
}
