export interface ApiResponse<T = any> {
  data?: T;
  statusCode?: number;
  message?: string;
  status?: string;
}

export type Param = string | number | boolean | null | undefined;

export interface BaseParams {
  [key: string]: Param;
}

export interface PaginatedResponse {
  page: number;
  total: number;
  totalPages: number;
}
