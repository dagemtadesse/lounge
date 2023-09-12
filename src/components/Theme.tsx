"use client";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { blue, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[500],
    },
    background: {
      default: "#1c1c1c",
      paper: "#161616"
    },
    text: {
      primary: "rgb(237, 237, 237)",
      secondary: "rgba(255,255,255,0.6)",
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
