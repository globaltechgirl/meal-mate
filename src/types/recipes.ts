export type RecipeStatus = "Planned" | "Cooked" | "Skipped";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type RecipeCategory = "Vegetarian" | "Vegan" | "Keto" | "Desserts";

export type StarState = "Pause" | "Star" | "Starred";

export type MealTypeFilter = "All" | MealType;
export type CategoryFilter = "All" | RecipeCategory;

export interface RecipeItem {
  id: string | number;
  name: string;
  note: string;
  image: string;
  mealType?: MealType;
  category?: RecipeCategory;
  status?: RecipeStatus;
  starred?: boolean;
}

export interface CreateRecipePayload {
  name: string;
  note?: string;
  image?: string;
  mealType?: MealType;
  category?: RecipeCategory;
  status?: RecipeStatus;
  starred?: boolean;
  createdAt?: string;
}

export interface UpdateRecipePayload {
  id: string | number;
  name?: string;
  note?: string;
  image?: string;
  mealType?: MealType;
  category?: RecipeCategory;
  status?: RecipeStatus;
  starred?: boolean;
  createdAt?: string;
}

export type StatusFilter = "All" | RecipeStatus;
export type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";
export type StarFilter = StarState;
