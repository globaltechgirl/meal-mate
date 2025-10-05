export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

import DashboardIcon from "@/assets/icons/home.tsx";
import CalendarIcon from "@/assets/icons/calendar.tsx";
import RecipesIcon from "@/assets/icons/recipes.tsx";
import ShoppingIcon from "@/assets/icons/shopping.tsx";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    CREATE: "/create",
  },
  ROOT: "/",
  HOME: "/home",
  OVERVIEW: "/overview",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  MEAL_CALENDAR: "/meal-calendar",
  RECIPES: "/recipes",
  SHOPPING_LIST: "/shopping-list",
  RECIPES_DETAILS: "/recipes-details",
} as const;

export const NAV_LINKS = [
  { label: "Dashboard", link: ROUTES.DASHBOARD, icon: DashboardIcon },
  { label: "Meal Calendar", link: ROUTES.MEAL_CALENDAR, icon: CalendarIcon },
  { label: "Recipes", link: ROUTES.RECIPES, icon: RecipesIcon },
  { label: "Shopping List", link: ROUTES.SHOPPING_LIST, icon: ShoppingIcon },
] as const;
