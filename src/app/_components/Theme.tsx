"use client";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#000",
    },
    divider: "rgb(51, 51, 51)",
    text: {
      primary: "rgb(237, 237, 237)",
      secondary: "rgb(153, 153, 153)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
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
