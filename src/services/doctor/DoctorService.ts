import { apiWrapper } from "@/utils";
import HttpClient from "../http-client/http-client";
import { LoginData, OrganizationData } from "@/interfaces";

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

  public static async resendOtpVerification(email: string) {
    return apiWrapper(() =>
      HttpClient.post(
        `${process.env.NEXT_PUBLIC_API_REQUEST_URL}${process.env.NEXT_PUBLIC_DOCTOR_SERVICE_PORT}/api/v1/profile/resend-verification`,
        {
          email,
        }
      )
    );
  }

  public static async geAllPermissions(organizationId?: string) {
    const {
      data: { message, data },
    } = await HttpClient.get(
      `${process.env.NEXT_PUBLIC_API_REQUEST_URL}${process.env.NEXT_PUBLIC_DOCTOR_SERVICE_PORT}/api/v1/profile/organization-info`,
      { params: { organizationId } }
    );

    const response: OrganizationData = {
      data: data,
      message: message,
    };

    return response;
  }

  public static async verificationResponse(
    email: string,
    verificationCode: string,
    deviceId: string,
    deviceType: string,
    loginType: string
  ): Promise<LoginData> {
    // login API
    const {
      data: { message, data },
    } = await HttpClient.post(
      `${process.env.NEXT_PUBLIC_API_REQUEST_URL}${process.env.NEXT_PUBLIC_DOCTOR_SERVICE_PORT}/api/v1/profile/verification`,
      {
        email,
        verificationCode,
        deviceId,
        deviceType,
        loginType,
      }
    );

    const response: LoginData = {
      data: data,
      message,
    };

    return response;
  }
}
