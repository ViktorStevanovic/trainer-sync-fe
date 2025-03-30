import type { AxiosError } from 'axios';

export interface ApiError<T = unknown> extends AxiosError<T> {
  message: string;
  code?: string;
  validationErrors?: Record<string, string[]>;
}

export interface PageParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}