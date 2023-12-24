import { Theme } from "../../../store/theme/theme.type";
import { FieldValues, Control, UseFormReturn } from "react-hook-form";
import { PickerItem } from "../../../features/AnalyzersFeatures/CalorieAnalyzer/calorieAnalyzer.type";

export interface PickerData {
  name: string;
  label: string;
  defaultValue: string | number;
  items: PickerItem[];
}

export interface PickersProps {
  pickerData: PickerData[];
  theme: Theme;
  control: Control<FieldValues>;
  setValue: UseFormReturn["setValue"];
}
