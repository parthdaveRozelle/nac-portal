import { useAppSelector, RootState } from "@/store";

export const useDoctorOrganization = () => {
  const organizations = useAppSelector(
    (state: RootState) => state.verificationReducer.data?.data?.organizations
  );

  return organizations;
};
