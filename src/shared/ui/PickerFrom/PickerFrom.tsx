import { Text, View } from "react-native";
import * as styles from "../../../entities/styles/global.style";
import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { type PickersProps } from "./piker.type";

export const PickerFrom = ({ pickerData, control, setValue, theme }: PickersProps) => {
  return (
    <>
      {pickerData.map((picker, index) => (
        <View key={index}>
          <Text style={[styles.commonTextStyle(theme, "text2", "text")]}>{picker.label}:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                style={styles.styles.picker}
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue);
                  setValue(picker.name, itemValue);
                }}
              >
                {picker.items.map((item, itemIndex) => (
                  <Picker.Item key={itemIndex} label={item.label} value={item.value} />
                ))}
              </Picker>
            )}
            name={picker.name}
            defaultValue={picker.defaultValue}
          />
        </View>
      ))}
    </>
  );
};
