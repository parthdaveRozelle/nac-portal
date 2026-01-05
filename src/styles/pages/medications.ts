import { flexUtils } from "../flexUtils";

export const medicationStyles = {
  boxHeaderFlex: {
    ...flexUtils.flexListBoxCustom,
    mb: 1,
    gap: { xs: 2, md: 3 },
  },
  textFeildMargin: { margin: "30px 0" },
  stackMargin: { margin: "20px" },
  boxStyle: {
    ...flexUtils.flexCenter,
    height: "300px",
  },
};
