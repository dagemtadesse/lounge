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
      contrastText: "#fff"
    },
    background: {
      default: "#161616",
      paper: "#202020",
    },
    divider: "rgb(255, 255, 255, 0.05)",
    text: {
      primary: "rgb(237, 237, 237)",
      secondary: "rgb(153, 153, 153)",
      disabled: "rgba(255,255,255,0.38)",
    },
  },
  typography: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: 13,
    button: {
      textTransform: "none",
    },
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
