import { useState, useEffect } from "react";
import useApiService from "@/services/api";
import type { ShoppingItem } from "@/types/shoppingitems";

const useShoppingItems = () => {
  const api = useApiService();
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/shopping-items/");
      setItems(res.data);
    } catch {
      setError("Failed to fetch shopping items");
    } finally {
      setLoading(false);
    }
  };

  const fetchItemDetail = async (id: string) => {
    try {
      const res = await api.get(`/api/shopping-items/${id}/`);
      return res.data;
    } catch {
      setError("Failed to fetch shopping item detail");
    }
  };

  const createItem = async (data: Partial<ShoppingItem>) => {
    try {
      const res = await api.post("/api/shopping-items/", data);
      fetchItems();
      return res.data;
    } catch {
      setError("Failed to create shopping item");
    }
  };

  const updateItem = async (id: string, data: Partial<ShoppingItem>) => {
    try {
      const res = await api.put(`/api/shopping-items/${id}/`, data);
      fetchItems();
      return res.data;
    } catch {
      setError("Failed to update shopping item");
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await api.delete(`/api/shopping-items/${id}/`);
      fetchItems();
    } catch {
      setError("Failed to delete shopping item");
    }
  };

  const toggleItem = async (id: string) => {
    try {
      await api.post(`/api/shopping-items/${id}/toggle/`);
      fetchItems();
    } catch {
      setError("Failed to toggle shopping item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, fetchItems, fetchItemDetail, createItem, updateItem, deleteItem, toggleItem, loading, error };
};

export default useShoppingItems;
