"use client";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary:{
      main: '#000'
    },
    background: {
      default: "#1c1c1c",
    },
  },
});

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
      <GlobalStyles styles={{}} />
    </ThemeProvider>
  );
};
