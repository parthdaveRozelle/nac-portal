"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export const useOrganizationPermission = () => {
  const { data, loading, error, hasFetched } = useAppSelector(
    (state: RootState) => state.organizationPermission
  );

  return {
    organizationWithPermission: data?.data,
    loading,
    error,
    hasFetched,
  };
};
