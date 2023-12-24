import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../entities/const/api/urls";
import { type ErrorDetail } from "../../entities/type/api/api.type";
import { createErrorObject } from "../../entities/utils/api/api.utils";
import i18next from "i18next";

export const searchProduct = async (text: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search_product?product_${i18next.language}=${encodeURIComponent(text)}`,
    );
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorDetail>);
    throw errorObject;
  }
};
