"use client";

import { IReactNode } from "@/interfaces";
import { flexUtils, authProviderStyles as styles } from "@/styles";
import { Grid, Paper } from "@mui/material";
import Auth from "@/assets/auth.svg";

export const AuthProvider = ({ children }: IReactNode) => {
  return (
    <Grid container component="main" sx={styles.gridHeight}>
      <Grid size={{ xs: 0, sm: 4, md: 7 }} sx={styles.authSvg}>
        <Auth />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8, md: 5 }}
        component={Paper}
        elevation={6}
        square
        sx={flexUtils.flexAlignCenter}
      >
        {children}
      </Grid>
    </Grid>
  );
};
