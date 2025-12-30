"use client";

import { IReactNode } from "@/interfaces";
import { authProviderStyles as styles } from "@/styles";
import { Paper, useTheme, Grid } from "@mui/material";
import Auth from "@/assets/auth.svg";

export const AuthProvider = ({ children }: IReactNode) => {
  const theme = useTheme();

  return (
    <Grid container component="main" sx={styles.gridHeight}>
      <Grid size={{ xs: 0, sm: 4, md: 6 }} display="flex" alignItems="center">
        <Auth style={{ color: theme.palette.primary.main }} />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 8, md: 6 }}
        component={Paper}
        elevation={6}
        square
        display="flex"
        alignItems="center"
      >
        {children}
      </Grid>
    </Grid>
  );
};
