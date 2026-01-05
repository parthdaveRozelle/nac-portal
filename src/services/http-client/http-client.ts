/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponseTransformer,
} from "axios";
import {
  store,
  resetUserVerification,
  resetOrganizationPermission,
} from "@/store";
import { TOKEN } from "@/constants";

export default class HttpClient {
  private static readonly baseURL: string =
    process.env.REACT_APP_API_BASEURL || "http://localhost:3004";

  private static buildHeader(obj = {}): AxiosRequestHeaders {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    Object.assign(header, obj);

    return header as AxiosRequestHeaders;
  }

  private static logoutUser() {
    const { dispatch } = store;
    dispatch(resetUserVerification());
    dispatch(resetOrganizationPermission());
    localStorage.clear();
  }

  private static transformResponse(
    input: string
  ): AxiosResponseTransformer | AxiosResponseTransformer[] {
    return JSON.parse(input);
  }

  private static client(header = {}): AxiosInstance {
    const config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      headers: this.buildHeader(header),
    };
    config.transformResponse = [
      (data) => {
        return data && typeof data === "string"
          ? this.transformResponse(data)
          : data;
      },
    ];

    const service = axios.create(config);

    // request interceptor for setting bearer token
    service.interceptors.request.use(
      async (config) => {
        // Modify the request config here (add headers, authentication tokens)
        const accessToken = this.getLocalAccessToken();
        // If token is present add it to request's Authorization Header
        const state = store.getState();
        const organizationWithPermission =
          state.organizationPermission.data?.data;
        const organizationInfo = organizationWithPermission?.organizationInfo;
        const organizationId = organizationInfo?._id;
        const organizationName = organizationInfo?.name;

        if (!!accessToken) {
          if (config.headers)
            config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers["organizationId"] = organizationId ?? "";
          config.headers["organizationName"] = organizationName ?? "";
          config.headers["roleId"] = organizationWithPermission?.roleId ?? "";
          config.headers["level"] = organizationWithPermission?.level;
        }
        return config;
      },
      (error) => {
        // Handle request errors here

        return Promise.reject(error);
      }
    );
    service.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        if (
          error.response.status == 401 &&
          window.location.pathname != "/login"
        ) {
          this.logoutUser();
          window.location.replace("/login");
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return service;
  }

  private static getLocalAccessToken = () => {
    return localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : "";
  };

  /**
   *
   * @param url
   * @returns
   */
  public static get(url: string, options?: AxiosRequestConfig) {
    return this.client().get(url, options);
  }

  /**
   *
   * @param url
   * @param payload
   * @returns
   */
  public static post(url: string, payload: any, header?: any): any {
    return this.client(header).post(url, payload);
  }

  public static patch(url: string, payload: any): any {
    return this.client().patch(url, payload);
  }

  public static put(url: string, payload: any, header?: any): any {
    return this.client(header).put(url, payload);
  }

  public static delete(url: string): any {
    return this.client().delete(url);
  }
}
