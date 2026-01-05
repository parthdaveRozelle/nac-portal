import { flexUtils } from "../flexUtils";

export const verifyOtpStyle = {
  gridBoxStyle: {
    my: 8,
    mx: 4,
    ...flexUtils.flexAlignCenterCol,
    width: "100%",
  },
  font: {
    fontSize: "30px",
    color: "white",
  },
  boxStyle: { mt: 1, width: "100%" },
  cursorPointer: { cursor: "pointer" },
  submitStyle: { mt: 3, mb: 2 },
};
