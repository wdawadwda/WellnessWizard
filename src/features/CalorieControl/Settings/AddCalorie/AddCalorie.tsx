import { View } from "react-native";
import { Theme } from "../../../../store/theme/theme.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../../../shared/ui/Button/Button";
import { KEYS } from "../../../../entities/const/asyncStorage.const";
import { calorieControlActions } from "../../../../store/calorieControl/calorieControl.slice";
import { useAppDispatch } from "../../../../store/store.types";
import { Control, useForm } from "react-hook-form";
import { useConst } from "./use/useConst";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputForm } from "../../../../shared/ui/InputForm/InputForm";

export default function AddCalorie({ theme, t }: { theme: Theme; t: (key: string) => string }) {
  const { formFields } = useConst();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      calories: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        calories: yup
          .number()
          .integer(`${t("validation.base.integer")}`)
          .positive(`${t("validation.base.positive")}`)
          .required()
          .typeError(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.mustNumber")}`),
      }),
    ),
    mode: "onChange",
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: { calories: number }) => {
    const { calories } = data;
    try {
      await AsyncStorage.setItem(KEYS.CALORIE_CONTROL.TOTAL_CALORIES, String(calories));
      dispatch(calorieControlActions.setTotalCalories(calories));
      reset();
    } catch (error) {
      console.error("Error saving desired calories to AsyncStorage:", error);
    }
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <InputForm
        detail={true}
        formFields={formFields}
        formState={formState}
        theme={theme}
        control={control as unknown as Control}
      />
      <Button disabled={!formState.isValid} style={{ marginTop: 5 }} onPress={handleSubmit(onSubmit)}>
        {t("buttonsTitles.save")}
      </Button>
    </View>
  );
}
