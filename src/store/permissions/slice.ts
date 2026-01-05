/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetOrganizationPageState, OrganizationData } from "@/interfaces";
import { DoctorHttpClient } from "@/services";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ErrorHandler from "../error-handler";

const initialState: GetOrganizationPageState = {
  data: undefined,
  loading: false,
  error: undefined,
  hasFetched: false,
};
const errorHandler = new ErrorHandler();

export const OrganizationPermissionInfo = createAsyncThunk(
  "organization/fetchDetail",
  async (organizationId?: string) => {
    try {
      const response = await DoctorHttpClient.geAllPermissions(organizationId);
      if (response?.message !== "success") {
        throw new Error("Incorrect Id");
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
  name: "organization-detail",
  initialState,
  reducers: {
    organizationDetail: (state) => {
      state.loading = false;
      state.data = undefined;
      state.error = undefined;
    },
    resetOrganizationPermission: () => initialState,
  },
  extraReducers(builder): void {
    builder.addCase(OrganizationPermissionInfo.pending, (state) => {
      state.loading = true;
      state.data = undefined;
      state.error = undefined;
    });
    builder.addCase(
      OrganizationPermissionInfo.fulfilled,
      (state, action: PayloadAction<OrganizationData>) => {
        state.loading = false;
        state.data = action.payload;
        state.hasFetched = true;
      }
    );
    builder.addCase(OrganizationPermissionInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});
export const { organizationDetail, resetOrganizationPermission } =
  slice.actions;
export default slice.reducer;
