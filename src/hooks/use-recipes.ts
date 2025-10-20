import { useState, useEffect } from "react";
import useApiService from "@/services/api";
import type { Recipe } from "@/types/recipes";

const useRecipes = () => {
  const api = useApiService();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/recipes/");
      setRecipes(res.data);
    } catch (err) {
      setError("Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetail = async (id: string) => {
    try {
      const res = await api.get(`/api/recipes/${id}/`);
      return res.data;
    } catch (err) {
      setError("Failed to fetch recipe detail");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/recipes/favorites/");
      return res.data;
    } catch (err) {
      setError("Failed to fetch favorites");
    }
  };

  const addFavorite = async (id: string) => {
    try {
      await api.post("/api/recipes/favorites/add/", { recipe_id: id });
    } catch {
      setError("Failed to add favorite");
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await api.post(`/api/recipes/favorites/remove/${id}/`);
    } catch {
      setError("Failed to remove favorite");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return { recipes, fetchRecipes, fetchRecipeDetail, fetchFavorites, addFavorite, removeFavorite, loading, error };
};

export default useRecipes;
