import { DefaultTheme } from "styled-components";
import { EFontWeights } from "./interfaces/EFontWeights";

export const defaultTheme: DefaultTheme = {
  name: "defaultTheme",
  palette: {
    primary: {
      main: "#ffb303",
      light: "#e7b850",
      dark: "#ce9500",
    },
    secondary: {
      main: "#707070", // gray
      light: "#999999",
      dark: "#525252",
    },
    danger: {
      main: "#f44336", // red
      light: "#f65446",
      dark: "#f3392d",
    },
    warning: {
      main: "#ff9800", // orange from Material-UI
      light: "#fca11b",
      dark: "#d47f02",
    },
    info: {
      main: "#2196f3", // light blue from Material-UI,
      light: "#42a6f6",
      dark: "#036fc6",
    },
    success: {
      main: "#4caf50", // green
      light: "#58b65c",
      dark: "#2cb431",
    },
    text: {
      main: "#333",
      contrastText: "#FFFFFF",
      light: "#c7c7c7",
      dark: "#5c5c5c",
    },
  },
  typography: {
    headline: {
      family: "Roboto,sans-serif",
      lineHeight: 1.2,
      weights: {
        thin: EFontWeights.LIGHT,
        regular: EFontWeights.MEDIUM,
        bold: EFontWeights.BOLD,
      },
      spacing: "0.35em",
    },
    body: {
      family: "Poppins,sans-serif",
      lineHeight: 1.5,
      weights: {
        thin: EFontWeights.LIGHT,
        regular: EFontWeights.MEDIUM,
        bold: EFontWeights.BOLD,
      },
      spacing: "0.35em",
    },
    size: {
      xxl: "2.5rem",
      xl: "2rem",
      lg: "1.75rem",
      md: "1.5rem",
      sm: "1.25rem",
      xs: "1rem",
      xxs: "0.75rem",
    },
  },
  spacings: {
    xxl: "2.5rem",
    xl: "2rem",
    lg: "1.75rem",
    md: "1.5rem",
    sm: "1rem",
    xs: "0.75rem",
    xxs: "0.5rem",
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
};
