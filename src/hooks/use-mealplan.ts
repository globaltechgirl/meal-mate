import { useState, useEffect } from "react";
import useApiService from "@/services/api";
import type { MealPlan } from "@/types/mealplans";

const useMealPlans = () => {
  const api = useApiService();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
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

  const createMealPlan = async (data: Partial<MealPlan>) => {
    try {
      const res = await api.post("/api/mealplans/", data);
      fetchMealPlans();
      return res.data;
    } catch {
      setError("Failed to create meal plan");
    }
  };

  const updateMealPlan = async (id: string, data: Partial<MealPlan>) => {
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

  return { mealPlans, fetchMealPlans, fetchMealPlanDetail, createMealPlan, updateMealPlan, deleteMealPlan, loading, error };
};

export default useMealPlans;
