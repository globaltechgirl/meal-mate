import type { BaseParams } from "@/types/api";

export const generateQueryString = (params: BaseParams): string => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};

export const appendQueryString = (url: string, queryString?: string): string => {
  return queryString ? `${url}?${queryString}` : url;
};

export const appendQueryParams = (url: string, params: BaseParams): string => {
  const queryString = generateQueryString(params);

  if (typeof window !== "undefined") {
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }

  return appendQueryString(url, queryString);
};

export const buildApiUrl = (baseUrl: string, params?: BaseParams): string => {
  if (!params) return baseUrl;
  const queryString = generateQueryString(params);
  return appendQueryString(baseUrl, queryString);
};
