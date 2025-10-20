export type Status = "Pending" | "Complete";

export interface ShoppingItem {
  name: string;
  note: string;
  qty: number;
  source: string;
  amount: number;
  status: Status;
  createdAt: string; 
}

export interface CreateShoppingItemPayload {
  name: string;
  note?: string;
  qty: number;
  source?: string;
  amount: number;
  status?: Status;
  createdAt?: string;
}

export interface UpdateShoppingItemPayload {
  id: string; 
  name?: string;
  note?: string;
  qty?: number;
  source?: string;
  amount?: number;
  status?: Status;
  createdAt?: string;
}

export type StatusFilter = "All" | Status;
export type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";
export type AmountView = Status;
