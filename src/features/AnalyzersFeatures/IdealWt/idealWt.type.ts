export interface FormField {
  name: "height";
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
  height: number;
  gender: string;
}
