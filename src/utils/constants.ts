export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    CREATE: "/create",
  },
  ROOT: "/",
  HOME: "/home",
  OVERVIEW: "/overview",
  PROFILE: "/profile",
  MEAL_CALENDAR: "/meal-calendar",
  RECIPES: "/recipes",
  SHOPPING_LIST: "/shopping-list",
} as const;

export const NAV_LINKS = [
  { label: "Meal Calendar", link: ROUTES.MEAL_CALENDAR },
  { label: "Recipes", link: ROUTES.RECIPES },
  { label: "Shopping List", link: ROUTES.SHOPPING_LIST },
] as const;
