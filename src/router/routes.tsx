import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Login from "@/pages/auth/login";
import Create from "@/pages/auth/create";
import Home from "@/pages/home";
import Overview from "@/pages/overview";
import MealCalendar from "@/pages/mealCalendar";
import Recipes from "@/pages/recipes";
import ShoppingList from "@/pages/shoppingList";
import Profile from "@/pages/profile";
import AuthGuard from "@/router/authGuard";
import { ROUTES } from "@/utils/constants";
import RecipesDetails from "@/pages/recipesDetails";

const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.HOME} replace />,
  },
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.OVERVIEW,
    element: <Overview />,
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.AUTH.CREATE,
    element: <Create />,
  },
  {
    path: ROUTES.ROOT,
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { path: ROUTES.MEAL_CALENDAR.replace("/", ""), element: <MealCalendar /> },
          { path: ROUTES.RECIPES.replace("/", ""), element: <Recipes /> },
          { path: ROUTES.SHOPPING_LIST.replace("/", ""), element: <ShoppingList /> },
          // { path: ROUTES.RECIPES_DETAILS.replace("/", ""), element: <RecipesDetails /> },
          { path: "recipes/:id", element: <RecipesDetails /> },
          { path: ROUTES.PROFILE.replace("/", ""), element: <Profile /> },
          { path: "*", element: <Navigate to={ROUTES.HOME} replace /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
