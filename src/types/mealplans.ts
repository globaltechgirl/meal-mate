export type MealStatus = "Planned" | "Completed";
export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type MealTypeFilter = "All" | MealType;
export type StatusFilter = "All" | MealStatus;
export type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";

export interface MealItem {
  id: number | string;
  name: string;
  note: string;
  image: string;
  type: MealType;
  status: MealStatus;
  recipesCount: number;
}

export interface CreateMealPayload {
  name: string;
  note?: string;
  image?: string;
  type?: MealType;
  status?: MealStatus;
  recipesCount?: number;
  createdAt?: string;
}

export interface UpdateMealPayload {
  id: number | string;
  name?: string;
  note?: string;
  image?: string;
  type?: MealType;
  status?: MealStatus;
  recipesCount?: number;
  createdAt?: string;
}
