import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  detail?: string;
  error?: string;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ErrorResponse>;
    return (
      err.response?.data?.message ||
      err.response?.data?.detail ||
      err.response?.data?.error ||
      err.message ||
      "Request failed"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred";
}
