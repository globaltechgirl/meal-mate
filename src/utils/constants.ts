export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  USER_MANAGEMENT: "/user-management",
  HOME: "/home",
};

export const NavLinks = [
  {
    label: "Home",
    link: ROUTES.HOME,
  },
];
