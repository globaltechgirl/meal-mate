export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/users/login/",
    LOGOUT: "/users/logout/",
    REGISTER: "/users/register/",
    TOKEN: "/users/api/token/",
    CHANGE_PASSWORD: "/users/password_change/", 
  },

  RECIPES: {
    LIST: "/api/recipes/",
    DETAIL: (id: string) => `/api/recipes/${id}/`,
    FAVORITES: "/api/recipes/favorites/",
    ADD_FAVORITE: "/api/recipes/favorites/add/",
    REMOVE_FAVORITE: (recipeId: string) =>
      `/api/recipes/favorites/remove/${recipeId}/`,
  },

  MEALPLANS: {
    LIST: "/api/mealplans/",
    DETAIL: (id: string) => `/api/mealplans/${id}/`,
  },

  SHOPPING_ITEMS: {
    LIST: "/api/shopping-items/",
    DETAIL: (id: string) => `/api/shopping-items/${id}/`,
    TOGGLE: (id: string) => `/api/shopping-items/${id}/toggle/`,
  },
} as const;

export type EndpointGroup = typeof ENDPOINTS;
