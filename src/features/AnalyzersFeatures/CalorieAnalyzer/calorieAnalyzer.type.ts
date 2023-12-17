export interface FormField {
  name: "height" | "weight" | "age" | "gender" | "activityLevel" | "desiredWeight" | "reductionType";
  placeholder: string;
  label: string;
  keyboardType: "numeric";
}

export interface CalorieAnalyzerFormData {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: number;
  desiredWeight: number;
  reductionType: number;
}

export type PickerItem = {
  label: string;
  value: string | number;
};

export type PickerDataItem = {
  name: "weight" | "height" | "age" | "gender" | "activityLevel" | "desiredWeight" | "reductionType";
  label: string;
  defaultValue: string | number;
  items: PickerItem[];
};
