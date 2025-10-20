import type { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { MealPlan } from "@/types/mealplans";
import { ApiAuthModes } from "@/types/enums";

const useMealPlansService = () => {
  const api = useAxiosApi(ApiAuthModes.Auth);

  const list = async (): Promise<ApiResponse<MealPlan[]>> => {
    const res: AxiosResponse<ApiResponse<MealPlan[]>> = await api.get(ENDPOINTS.MEALPLANS.LIST);
    return res.data;
  };

  const detail = async (id: string): Promise<ApiResponse<MealPlan>> => {
    const res: AxiosResponse<ApiResponse<MealPlan>> = await api.get(ENDPOINTS.MEALPLANS.DETAIL(id));
    return res.data;
  };

  return { list, detail };
};

export default useMealPlansService;
