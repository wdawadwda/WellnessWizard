export interface User {
  username: string;
  id: number;
  email: string;
  is_staff: boolean;
}

export type ErrorDetail = {
  detail: string;
};

export interface ErrorObject {
  statusErr: string | number;
  detail: string;
  message: string;
}

export interface JWTTokens {
  access: string;
  refresh: string;
}

export interface Access {
  access: string;
}

export type UserRequest = {
  email: string;
  username: string;
  password: string;
};

export type Status = "idle" | "loading" | "success" | "error";
