import { apiWrapper } from "@/utils";
import HttpClient from "../http-client/http-client";

export class DoctorHttpClient {
  public static async loginresponse(email: string, password: string) {
    return apiWrapper<{
      isAuthenticatorEnable: boolean;
    }>(() =>
      HttpClient.post(
        `${process.env.NEXT_PUBLIC_API_REQUEST_URL}${process.env.NEXT_PUBLIC_DOCTOR_SERVICE_PORT}/api/v1/profile/login`,
        {
          email,
          password,
        }
      )
    );
  }
}
