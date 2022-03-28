import React from "react";
import { TBootstrapPaletteExtended } from "../../../assets/themes/interfaces/TBootstrapPalette";

/**
 * Declaring array here to allow the select-control in stories
 */
export const ATypoComponents = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "p",
] as const;

export const ATypoVariants = [...ATypoComponents, "psmall"] as const;

export interface ITypography {
  children: React.ReactNode;
  /**
   * Defines the type of the typography (h1-h6, p, div)
   */
  variant?: typeof ATypoVariants[number];
  color?: TBootstrapPaletteExtended;
  italic?: boolean;
  /**
   * Defines the HTML-tag with which the component is to be rendered
   */
  component?: typeof ATypoComponents[number];
  /**
   * Aligning value of the text
   */
  align?: "start" | "center" | "end" | "justify";
  /**
   * Display value of the text
   */
  display?: "block" | "inline";
  /**
   * Whether the text should be wrapped or not
   */
  noWrap?: boolean;
  /**
   * Additional CSS-classes that can be added.
   */
  classes?: string;
  /**
   * Determines, whether there is a margin-bottom or not
   */
  gutterBottom?: boolean;
}
