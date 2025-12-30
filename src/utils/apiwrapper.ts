import { IErrorResponse, ISuccessResponse } from "@/interfaces";
import { AxiosError, AxiosResponse } from "axios";

export async function apiWrapper<T>(
  apiFunction: () => Promise<AxiosResponse<ISuccessResponse<T>>>
): Promise<{
  data: ISuccessResponse<T> | null;
  error: AxiosError<IErrorResponse> | null;
}> {
  let data: AxiosResponse<ISuccessResponse<T>> | null = null;
  let error: AxiosError<IErrorResponse> | null = null;
  try {
    data = await apiFunction();
  } catch (err) {
    error = err as AxiosError<IErrorResponse>;
  }
  return { data: data?.data || null, error };
}
