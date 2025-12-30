import { apiWrapper } from "@/utils/apiwrapper";
import HttpClient from "../http-client/http-client";
import { IFetchMedicationsResponse } from "@/interfaces";

export class MedicineHttpClient {
  public static async getAllMedicines(filter: string, pagination: string) {
    return apiWrapper<IFetchMedicationsResponse>(() =>
      HttpClient.get("http://localhost:6001/api/v1/nac-fhir/medicines", {
        params: {
          filter,
          pagination,
        },
      })
    );
  }
}
