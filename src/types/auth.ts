import type { UseFormReturnType } from "@mantine/form";
import { type User } from "@/types/user";

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
}

export interface LoginValues {
  username: string;
  password: string;
}

export interface changePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginFormProps {
  form: UseFormReturnType<LoginValues>;
  handleSubmit: (values: LoginValues) => void;
  loading: boolean;
}
