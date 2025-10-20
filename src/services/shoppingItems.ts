import type { AxiosResponse } from "axios";
import { useAxiosApi } from "@/api/api";
import { ENDPOINTS } from "@/api/endpoints";
import type { ApiResponse } from "@/types/api";
import type { ShoppingItem } from "@/types/shoppingitems";
import { ApiAuthModes } from "@/types/enums";

const useShoppingItemsService = () => {
  const api = useAxiosApi(ApiAuthModes.Auth);

  const list = async (): Promise<ApiResponse<ShoppingItem[]>> => {
    const res: AxiosResponse<ApiResponse<ShoppingItem[]>> = await api.get(ENDPOINTS.SHOPPING_ITEMS.LIST);
    return res.data;
  };

  const detail = async (id: string): Promise<ApiResponse<ShoppingItem>> => {
    const res: AxiosResponse<ApiResponse<ShoppingItem>> = await api.get(ENDPOINTS.SHOPPING_ITEMS.DETAIL(id));
    return res.data;
  };

  const toggle = async (id: string): Promise<ApiResponse<ShoppingItem>> => {
    const res: AxiosResponse<ApiResponse<ShoppingItem>> = await api.post(ENDPOINTS.SHOPPING_ITEMS.TOGGLE(id));
    return res.data;
  };

  return { list, detail, toggle };
};

export default useShoppingItemsService;
