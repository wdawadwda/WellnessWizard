import { yupResolver } from "@hookform/resolvers/yup";
import { Activity } from "../../../entities/type/analyzers/calorieAnalyzer.type";
import { reducersMap } from "../../../entities/utils/calorieControl/addPosition.utils";
import { AddCustomProductProps } from "../AddCustomProduct/addCustomProduct.type";
import * as yup from "yup";
import { t } from "i18next";
import { useAppDispatch } from "../../../store/store.types";
import { Control, useForm } from "react-hook-form";
import { useConst } from "./use/useConst";
import { View } from "react-native";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { Button } from "../../../shared/ui/Button/Button";

export default function AddCustomActivity({ theme, title, success }: AddCustomProductProps) {
  const dispatch = useAppDispatch();
  const { formFields } = useConst();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      exercise: undefined,
      calories: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        exercise: yup
          .string()
          .required(`${t("text.analyzersText.calorieControl.meals.exercise")} ${t("validation.base.isRequired")}`),
        calories: yup
          .number()
          .typeError(`${t("text.analyzersText.product.calories")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.product.calories")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.product.calories")} ${t("validation.base.isRequired")}`),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: Activity) => {
    const updatedData = { ...data };

    const reducer = reducersMap[title];
    if (reducer) {
      dispatch(reducer([updatedData]));
    }
    success(true);
    reset();
  };

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button style={{ marginTop: 10 }} disabled={!formState.isValid} onPress={handleSubmit(onSubmit)}>
        {t(`buttonsTitles.analyzers.saveProduct`)}
      </Button>
    </View>
  );
}
