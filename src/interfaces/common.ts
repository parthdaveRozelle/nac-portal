export interface IReactNode {
  children: React.ReactNode;
}

export interface IErrorResponse {
  message: string;
}

export interface ISuccessResponse<T> {
  data: T;
  message: string;
}

export interface IPagination {
  page: number | null;
  limit: number | null;
}
