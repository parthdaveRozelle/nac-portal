import { Theme } from "@mui/material";
import { flexUtils } from "../flexUtils";

export const authProviderStyles = {
  gridHeight: {
    height: "100vh",
    overflow: "hidden",
  },
  authSvg: {
    height: "100%",
    ...flexUtils.flexAlignCenter,
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
  },
};
