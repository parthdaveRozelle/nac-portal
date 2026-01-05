import { IDoctorOrganizations, IErrorResponse } from "@/interfaces";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const queryParams = {
  filter: <T>(params: Record<string, T>): string => JSON.stringify(params),
  pagination: (limit: number | null = 5, page: number | null = 1): string =>
    JSON.stringify({ page, limit }),
};

export const toastError = (
  error: AxiosError<IErrorResponse> | null,
  errorMessage: string = "Something Went Wrong"
) => {
  toast.error(error ? error.response?.data?.message : errorMessage);
};

export const createEmptyArray = (length: number): string[] => {
  return Array(length).fill("");
};

export const getPrimaryOrganization = (
  organizations?: IDoctorOrganizations[]
) => {
  return organizations?.find((organization) => organization.isPrimary === true);
};
