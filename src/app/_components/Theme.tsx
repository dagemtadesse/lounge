"use client";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#EFB495",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: red[300],
    },
    background: {
      default: "#191919",
    },
    divider: "rgb(255, 255, 255, 0.1)",
    text: {
      primary: "rgb(237, 237, 237)",
      secondary: "rgb(153, 153, 153)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
  typography: {
    fontFamily: "'Public Sans', sans-serif",
  },
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
      <GlobalStyles styles={{}} />
    </ThemeProvider>
  );
};
