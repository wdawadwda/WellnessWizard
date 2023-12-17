import { Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import * as styles from "../../../entities/styles/global.style";

import { Path } from "react-hook-form";
import { FormField, FormInputProps } from "./input.type";

export const InputForm = <T extends FieldValues>({ formFields, formState, theme, control }: FormInputProps<T>) => {
  return (
    <>
      {formFields.map((field: FormField) => (
        <View key={field.name}>
          <Text
            style={[styles.commonTextStyle(theme, "text2", "text"), styles.styles.inputLabel]}
          >{`${field.label}:`}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.styles.input}
                placeholder={field.placeholder}
                value={value ? String(value) : ""}
                onChangeText={(text) => onChange(text)}
                keyboardType={field.keyboardType}
              />
            )}
            name={field.name as Path<T>}
          />
          {formState.errors && field.name in formState.errors && formState.errors[field.name] && (
            <View style={styles.darkStyles.containerAlert}>
              <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>
                {formState.errors[field.name]?.message}
              </Text>
            </View>
          )}
        </View>
      ))}
    </>
  );
};
