import { View } from "react-native";
import { Control, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { useConst } from "./use/useConst";
import { InputForm } from "../../../shared/ui/InputForm/InputForm";
import { Button } from "../../../shared/ui/Button/Button";
import { reducersMap } from "../../../entities/utils/calorieControl/addPosition.utils";
import { useAppDispatch } from "../../../store/store.types";
import { zeroValues } from "./addCustomProduct.const";
import { type AddCustomProductProps } from "./addCustomProduct.type";
import { Product, type ProductFormData } from "../../../entities/type/analyzers/calorieAnalyzer.type";

export default function AddCustomProduct({ theme, title, success }: AddCustomProductProps) {
  const dispatch = useAppDispatch();
  const { formFields } = useConst();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      product: undefined,
      weight: undefined,
      calories: undefined,
      carbs: undefined,
      fat: undefined,
      protein: undefined,
    },
    resolver: yupResolver(
      yup.object().shape({
        product: yup
          .string()
          .required(`${t(`text.analyzersText.product.inputTitle.product`)} ${t("validation.base.isRequired")}`),
        carbs: yup
          .number()
          .typeError(`${t("validation.base.mustNumber")}`)
          .min(0, `${t("validation.base.aboveZero")}`),
        fat: yup
          .number()
          .typeError(`${t("validation.base.mustNumber")}`)
          .min(0, `${t("validation.base.aboveZero")}`),
        protein: yup
          .number()
          .typeError(`${t("validation.base.mustNumber")}`)
          .min(0, `${t("validation.base.aboveZero")}`),
        calories: yup
          .number()
          .typeError(`${t("text.analyzersText.product.calories")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.product.calories")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.product.calories")} ${t("validation.base.isRequired")}`),
        weight: yup
          .number()
          .typeError(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.mustNumber")}`)
          .min(1, `${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.cannotBeZero")}`)
          .required(`${t("text.analyzersText.biometrics.weightFull")} ${t("validation.base.isRequired")}`),
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = (data: ProductFormData) => {
    const updatedData: Product = { ...zeroValues, ...data };

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
