import { useState, useEffect } from "react";
import { useAxiosApi } from "@/api/api";
import type { MealItem } from "@/types/mealplans";
import { ApiAuthModes } from "@/types/enums";

const useMealPlans = () => {
  const api = useAxiosApi(ApiAuthModes.BearerToken); 
  const [mealPlans, setMealPlans] = useState<MealItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMealPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/mealplans/");
      setMealPlans(res.data);
    } catch {
      setError("Failed to fetch meal plans");
    } finally {
      setLoading(false);
    }
  };

  const fetchMealPlanDetail = async (id: string) => {
    try {
      const res = await api.get(`/api/mealplans/${id}/`);
      return res.data;
    } catch {
      setError("Failed to fetch meal plan detail");
    }
  };

  const createMealPlan = async (data: Partial<MealItem>) => {
    try {
      const res = await api.post("/api/mealplans/", data);
      fetchMealPlans();
      return res.data;
    } catch {
      setError("Failed to create meal plan");
    }
  };

  const updateMealPlan = async (id: string, data: Partial<MealItem>) => {
    try {
      const res = await api.put(`/api/mealplans/${id}/`, data);
      fetchMealPlans();
      return res.data;
    } catch {
      setError("Failed to update meal plan");
    }
  };

  const deleteMealPlan = async (id: string) => {
    try {
      await api.delete(`/api/mealplans/${id}/`);
      fetchMealPlans();
    } catch {
      setError("Failed to delete meal plan");
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return {  mealPlans, fetchMealPlans, fetchMealPlanDetail, createMealPlan, updateMealPlan, deleteMealPlan, loading, error };
};

export default useMealPlans;


