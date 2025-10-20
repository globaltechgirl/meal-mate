import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { ApiAuthModes } from "@/types/enums";

const BASE_URL = "https://meal-mate-backend-xyzj.onrender.com";

export const useAxiosApi = (apiAuthMode: ApiAuthModes): AxiosInstance => {
  const accessToken = useSelector((state: RootState) => state.auth.token);

  const AxiosApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });

  AxiosApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (apiAuthMode === ApiAuthModes.BearerToken && accessToken) {
        config.headers.Authorization = `Token ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  return AxiosApi;
};
