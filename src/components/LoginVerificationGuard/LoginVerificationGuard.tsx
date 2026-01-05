"use client";

import { useAppDispatch } from "@/store";
import { OrganizationPermissionInfo } from "@/store/permissions/slice";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import {
  useDoctorOrganization,
  useOrganizationPermission,
} from "@/customhooks";
import { getPrimaryOrganization } from "@/utils";

export const LoginVerificationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const organizations = useDoctorOrganization();
  const primaryOrganization = getPrimaryOrganization(organizations);
  const { loading, hasFetched } = useOrganizationPermission();

  useEffect(() => {
    if (!hasFetched) {
      const organizationId =
        organizations && organizations.length && primaryOrganization
          ? primaryOrganization.organizationId
          : undefined;
      dispatch(OrganizationPermissionInfo(organizationId));
    }
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
