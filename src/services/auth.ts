import type { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { LoginValues, LoginResponse, changePasswordValues } from "@/types/auth";
import { ApiAuthModes } from "@/types/enums";

const useAuthService = () => {
  const api = useAxiosApi(ApiAuthModes.NoAuth);

  const login = async (data: LoginValues): Promise<ApiResponse<LoginResponse>> => {
    const res: AxiosResponse<ApiResponse<LoginResponse>> = await api.post(
      ENDPOINTS.AUTH.LOGIN,
      data
    );
    return res.data;
  };

  const logout = async (): Promise<void> => {
    await api.post(ENDPOINTS.AUTH.LOGOUT);
  };

  const register = async (data: LoginValues): Promise<ApiResponse<LoginResponse>> => {
    const res: AxiosResponse<ApiResponse<LoginResponse>> = await api.post(
      ENDPOINTS.AUTH.REGISTER,
      data
    );
    return res.data;
  };

  const changePassword = async (data: changePasswordValues): Promise<ApiResponse<null>> => {
    const res: AxiosResponse<ApiResponse<null>> = await api.post(
      ENDPOINTS.AUTH.CHANGE_PASSWORD, 
      data
    );
    return res.data;
  };

  return { login, logout, register, changePassword };
};

export default useAuthService;
