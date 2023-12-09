export interface FormField {
  name: "wristCircumference";
  placeholder: string;
  label: string;
  keyboardType: "numeric";
}

export type PickerItem = {
  label: string;
  value: string;
};

export type PickerDataItem = {
  name: "gender";
  label: string;
  defaultValue: string;
  items: PickerItem[];
};

export interface FormData {
  wristCircumference: number;
  gender: string;
}
