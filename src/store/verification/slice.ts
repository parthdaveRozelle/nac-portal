/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ErrorHandler from "../error-handler";
import { DoctorHttpClient } from "@/services";
import { LoginData, LoginPageState } from "@/interfaces";
import { toast } from "react-toastify";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IVerifyDataConditions {
  email: string;
  verificationCode: string;
  deviceId: string;
  deviceType: string;
  router: AppRouterInstance;
  loginType: string;
}
const initialState: LoginPageState = {
  data: undefined,
  loading: false,
  error: undefined,
};
const errorHandler = new ErrorHandler();

export const VerifyDoctor = createAsyncThunk(
  "verification/doctor",
  async (credentials: IVerifyDataConditions) => {
    const { email, verificationCode, deviceId, deviceType, router, loginType } =
      credentials;
    try {
      const response = await DoctorHttpClient.verificationResponse(
        email,
        verificationCode,
        deviceId,
        deviceType,
        loginType
      );
      if (response?.message !== "success") {
        throw new Error("Incorrect Credentials");
      } else {
        router.push("/dashboard");
      }
      return response;
    } catch (_error: any) {
      const errorMessage = errorHandler.handler(_error);
      const obj = JSON.parse(errorMessage);
      toast.warning(obj.message);
      throw new Error(errorMessage);
    }
  }
);

const slice = createSlice({
  name: "user-verification",
  initialState,
  reducers: {
    resetUserVerification: (state) => {
      state.loading = false;
      state.data = undefined;
      state.error = undefined;
      localStorage.clear();
    },
  },
  extraReducers(builder): void {
    builder.addCase(VerifyDoctor.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(
      VerifyDoctor.fulfilled,
      (state, action: PayloadAction<LoginData>) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("token", action.payload.data.token);
      }
    );
    builder.addCase(VerifyDoctor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});
export const { resetUserVerification } = slice.actions;
export default slice.reducer;
