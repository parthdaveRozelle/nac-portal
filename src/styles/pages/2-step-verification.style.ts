import { flexUtils } from "@/styles/flexUtils";
import { Theme } from "@mui/material";

export const twoStepVerificationStyle = {
  mainBox: {
    my: 8,
    mx: 4,
    ...flexUtils.flexAlignCenterCol,
    width: "100%",
  },
  avtarStyle: {
    bgcolor: "secondary.main",
    marginBottom: (theme: Theme) => theme.spacing(2),
  },
  lockIconStyle: { fontSize: "30px" },
  otpMainBox: {
    ...flexUtils.flexJustifyCenter,
    gap: { xs: 1, sm: 3, md: 2 },
    mt: 4,

    "& .MuiOutlinedInput-root": {
      width: { xs: "40px", sm: "50px", md: "50px" },
      height: { xs: "40px", sm: "50px", md: "50px" },
    },
    "& .MuiInputBase-input": {
      textAlign: "center",
      fontSize: { xs: "16px", sm: "18px", md: "20px" },
      padding: 0,
    },
  },
  submitBox: { mt: 2, width: "100%" },
  submitStyle: {
    mt: 3,
    mb: 2,
    fontSize: { xs: "14px", sm: "16px" },
  },
  verifyOtpLink: {
    cursor: "pointer",
    fontSize: { xs: "12px", sm: "14px" },
  },
};
