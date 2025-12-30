/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponseTransformer,
} from "axios";

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

    return service;
  }

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
