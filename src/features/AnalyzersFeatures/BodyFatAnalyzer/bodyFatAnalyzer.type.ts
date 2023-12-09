export type FormField = {
  name: string;
  label: string;
  placeholder: string;
  keyboardType: "numeric";
};

export interface PickerData {
  name: string;
  label: string;
  defaultValue: string;
  items: { label: string; value: string }[];
}

export interface FormData extends FormFields {
  gender: string;
}

interface FormFields {
  weight: number;
  height: number;
  waist: number;
}
