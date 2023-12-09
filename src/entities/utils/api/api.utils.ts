import { type AxiosError } from "axios";
import { ErrorDetail } from "../../type/api/api.type";

export function createErrorObject(error: AxiosError<ErrorDetail>) {
  const errorStatus = error.response?.status || "";
  const errorData = JSON.stringify(error.response?.data.detail) || "";
  const errorMassage = error.message || "";
  return {
    statusErr: errorStatus,
    detail: errorData,
    message: errorMassage,
  };
}
