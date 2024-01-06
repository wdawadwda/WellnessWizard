import { Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import * as styles from "../../../entities/styles/global.style";

import { Path } from "react-hook-form";
import { FormField, FormInputProps } from "./input.type";
import { DetailButton } from "../Button/DetailButton/DetailButton";
import { useState } from "react";

export const InputForm = <T extends FieldValues>({
  formFields,
  formState,
  theme,
  control,
  detail = false,
}: FormInputProps<T> & { detail?: boolean }) => {
  if (detail) {
    const [isTextVisible, setIsTextVisible] = useState(false);
    return (
      <>
        {formFields.map((field: FormField) => (
          <View key={field.name}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={[styles.commonTextStyle(theme, "text2", "text"), styles.styles.inputLabel]}
              >{`${field.label}:`}</Text>
              {field.detail && <DetailButton onPress={() => setIsTextVisible(!isTextVisible)} />}
            </View>
            {field.detail && isTextVisible && (
              <>
                {field.detailText1 && (
                  <Text style={[styles.commonTextStyle(theme, "text2", "text2"), styles.styles.textForButtonDetail]}>
                    {`${field.detailText1}`}
                  </Text>
                )}
                {field.detailText2 && (
                  <Text style={[styles.commonTextStyle(theme, "text2", "text2"), styles.styles.textForButtonDetail]}>
                    {`${field.detailText2}`}
                  </Text>
                )}
              </>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.styles.input}
                  placeholder={field.placeholder}
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(text)}
                  keyboardType={field.keyboardType}
                  secureTextEntry={field.secureTextEntry || false}
                />
              )}
              name={field.name as Path<T>}
            />
            {formState.errors && field.name in formState.errors && formState.errors[field.name] && (
              <View style={[styles.darkStyles.containerAlert, { marginBottom: 5 }]}>
                <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>
                  {formState.errors[field.name]?.message}
                </Text>
              </View>
            )}
          </View>
        ))}
      </>
    );
  } else {
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
                  secureTextEntry={field.secureTextEntry || false}
                />
              )}
              name={field.name as Path<T>}
            />
            {formState.errors && field.name in formState.errors && formState.errors[field.name] && (
              <View style={[styles.darkStyles.containerAlert, { marginBottom: 5 }]}>
                <Text style={[styles.commonTextStyle(theme, "text", "text"), styles.styles.alert]}>
                  {formState.errors[field.name]?.message}
                </Text>
              </View>
            )}
          </View>
        ))}
      </>
    );
  }
};
