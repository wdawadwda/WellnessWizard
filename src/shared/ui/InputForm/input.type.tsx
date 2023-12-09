import { Theme } from "../../../../store/theme/theme.type";
import { FieldValues, Control } from "react-hook-form";

export type KeyboardType =
  | "default"
  | "numeric"
  | "email-address"
  | "phone-pad"
  | "number-pad"
  | "decimal-pad"
  | "visible-password"
  | "ascii-capable"
  | "url"
  | "name-phone-pad"
  | "twitter"
  | "web-search";

export interface FormField {
  name: string;
  placeholder: string;
  label: string;
  keyboardType: KeyboardType;
}

export interface FormInputProps<T extends FieldValues> {
  formFields: FormField[];
  formState: T;
  theme: Theme;
  control: Control<T>;
}
