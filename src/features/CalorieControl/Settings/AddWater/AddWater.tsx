import { View } from "react-native";
import { Theme } from "../../../../store/theme/theme.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../../../shared/ui/Button/Button";
import { KEYS } from "../../../../entities/const/asyncStorage.const";
import { useAppDispatch } from "../../../../store/store.types";
import { calorieControlActions } from "../../../../store/calorieControl/calorieControl.slice";
import { Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useConst } from "./use/useConst";
import { InputForm } from "../../../../shared/ui/InputForm/InputForm";

export default function AddWater({ theme, t }: { theme: Theme; t: (key: string) => string }) {
  const { formFields } = useConst();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      water: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        water: yup
          .number()
          .integer(`${t("validation.base.integer")}`)
          .positive(`${t("validation.base.positive")}`)
          .max(35, `${t("validation.addWater.maxWaterGlasses")}`)
          .required()
          .typeError(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.mustNumber")}`),
      }),
    ),
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: { water: number }) => {
    const { water } = data;

    try {
      await AsyncStorage.setItem(KEYS.CALORIE_CONTROL.AMOUNT_OF_WATER, water.toString());
      dispatch(calorieControlActions.setAmountOfWater(water));
      reset();
    } catch (error) {
      console.error("Error saving desired calories to AsyncStorage:", error);
    }
  };

  return (
    <View>
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button style={{ marginTop: 5 }} disabled={!formState.isValid} onPress={handleSubmit(onSubmit)}>
        {t("buttonsTitles.save")}
      </Button>
    </View>
  );
}
