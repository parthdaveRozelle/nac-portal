import { flexUtils } from "../flexUtils";

export const loginStyle = {
  signInBoxStyle: {
    my: 8,
    mx: 4,
    ...flexUtils.flexAlignCenterCol,
    width: "100%",
  },
  avtarStyle: { m: 1, bgcolor: "primary.main" },
  boxformStyle: { mt: 1 },

  signInButton: {
    mt: 3,
    mb: 2,
    fontFamily: "Barlow",
  },
};
