import { flexUtils } from "../flexUtils";
import { Theme } from "@mui/material";

export const loginStyle = {
  backDropStyle: {
    color: "#fff",
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
  alertStyle: {
    position: "absolute",
    width: "40vw",
    m: "10px",
    right: "0px",
  },
  signInBoxStyle: {
    my: 8,
    mx: 4,
    ...flexUtils.flexAlignCenterCol,
  },
  signInButton: {
    mt: 3,
    mb: 2,
  },
  gridHeight: {
    height: "100vh",
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
  },
  avtarStyle: { m: 1, bgcolor: "primary.main" },
  boxformStyle: { mt: 1 },
  cursorPointer: { cursor: "pointer" },
};
