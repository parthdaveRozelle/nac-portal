"use client";

import { IReactNode } from "@/interfaces";
import { charcoal } from "@/styles";
import { ThemeProvider } from "@mui/material";

export const ThemeClientProvider = ({ children }: IReactNode) => {
  return <ThemeProvider theme={charcoal}>{children}</ThemeProvider>;
};
