import { IMedicines } from "../pages";

export interface IFetchMedicationsResponse {
  results: IMedicines[];
  page: number;
  total: number;
  pages: number;
  limit: number;
}
