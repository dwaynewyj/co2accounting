import React from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./globals.css";

export default function ThemeProvider({ children }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
