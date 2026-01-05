/* eslint-disable @typescript-eslint/no-explicit-any */

import error from "./error";
class ErrorHandler {
  public handler(_error: any): string {
    return JSON.stringify(error(_error.response.data));
  }
}
export default ErrorHandler;
