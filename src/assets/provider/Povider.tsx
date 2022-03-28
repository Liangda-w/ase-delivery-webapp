import React from "react";
import { ThemeProvider } from "styled-components";
import { IProvider } from "./IProvider";
import "../vendor/bootstrap.scss";
import { defaultTheme } from "../themes/defaultTheme";

export const UiLibProvider: React.FC<IProvider> = ({ children }: IProvider) => (
  <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
