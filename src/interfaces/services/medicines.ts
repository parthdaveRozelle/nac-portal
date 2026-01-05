// import { IMedicines } from "../pages";

export interface IFetchMedicationsResponse {
  results: unknown[];
  page: number;
  total: number;
  pages: number;
  limit: number;
}
