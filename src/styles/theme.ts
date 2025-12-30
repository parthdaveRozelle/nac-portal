import { BRAND_COLORS } from "@/constants";
import { createTheme } from "@mui/material/styles";

export const charcoal = createTheme({
  palette: {
    primary: {
      main: BRAND_COLORS.CHARCOAL,
    },
    secondary: {
      main: BRAND_COLORS.MUTED_GREEN,
      contrastText: BRAND_COLORS.CHARCOAL,
    },
    error: {
      main: BRAND_COLORS.PEACH,
      contrastText: BRAND_COLORS.CHARCOAL,
    },
    warning: {
      main: BRAND_COLORS.SOFT_YELLOW,
      contrastText: BRAND_COLORS.CHARCOAL,
    },
    info: {
      main: BRAND_COLORS.MUTED_GREEN,
      contrastText: "#ffffff",
    },
    success: {
      main: BRAND_COLORS.MUTED_GREEN,
      contrastText: BRAND_COLORS.CHARCOAL,
    },
    text: {
      primary: BRAND_COLORS.CHARCOAL,
      secondary: BRAND_COLORS.MUTED_GREEN,
    },
  },
  // typography: {
  //   fontFamily: "Barlow",
  //   h1: { fontFamily: "Barlow" },
  //   h2: { fontFamily: "Barlow" },
  //   h3: { fontFamily: "Barlow" },
  //   h4: { fontFamily: "Barlow" },
  //   h5: { fontFamily: "Barlow" },
  //   h6: { fontFamily: "Barlow" },
  //   body1: { fontFamily: "Roboto" },
  //   body2: { fontFamily: "Roboto," },
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontFamily: "Barlow",
          textTransform: "none",
        },
        contained: {
          backgroundColor: BRAND_COLORS.PEACH,
          color: BRAND_COLORS.CHARCOAL,
          "&:hover": {
            backgroundColor: "#e89c6f",
          },
        },
      },
    },
  },
});
