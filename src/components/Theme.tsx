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
      default: "#191919",
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
