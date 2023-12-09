export type ErrorDetail = {
  detail: string;
};

export interface ErrorObject {
  statusErr: string | number;
  detail: string;
  message: string;
}
