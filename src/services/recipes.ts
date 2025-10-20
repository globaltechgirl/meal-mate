import type { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { RecipeItem } from "@/types/recipes";
import { ApiAuthModes } from "@/types/enums";

const useRecipesService = () => {
  const api = useAxiosApi(ApiAuthModes.Auth);

  const list = async (): Promise<ApiResponse<RecipeItem[]>> => {
    const res: AxiosResponse<ApiResponse<RecipeItem[]>> = await api.get(ENDPOINTS.RECIPES.LIST);
    return res.data;
  };

  const detail = async (id: string): Promise<ApiResponse<RecipeItem>> => {
    const res: AxiosResponse<ApiResponse<RecipeItem>> = await api.get(ENDPOINTS.RECIPES.DETAIL(id));
    return res.data;
  };

  const listFavorites = async (): Promise<ApiResponse<RecipeItem[]>> => {
    const res: AxiosResponse<ApiResponse<RecipeItem[]>> = await api.get(ENDPOINTS.RECIPES.FAVORITES);
    return res.data;
  };

  const addFavorite = async (recipeId: string): Promise<ApiResponse<null>> => {
    const res: AxiosResponse<ApiResponse<null>> = await api.post(ENDPOINTS.RECIPES.ADD_FAVORITE, { recipeId });
    return res.data;
  };

  const removeFavorite = async (recipeId: string): Promise<ApiResponse<null>> => {
    const res: AxiosResponse<ApiResponse<null>> = await api.post(ENDPOINTS.RECIPES.REMOVE_FAVORITE(recipeId));
    return res.data;
  };

  return { list, detail, listFavorites, addFavorite, removeFavorite };
};

export default useRecipesService;
