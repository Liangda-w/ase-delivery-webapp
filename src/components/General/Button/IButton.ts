import React from "react";
import { TBootstrapPalette } from "../../../assets/themes/interfaces/TBootstrapPalette";

export interface IButton {
  /**
   * This describes the color of the button.
   */
  color?: TBootstrapPalette;
  /**
   * Here we decribe the type of button.
   */
  type?: "default" | "outline" | "navItem";
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Size of the button
   */
  size?: "lg" | "md" | "sm";
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Additional stylings
   */
  className?: string;
  /**
   * onClck event
   */
  onClick?: () => void;
  /**
   * Defines the HTML attribute type for the button
   */
  htmlType?: "button" | "submit" | "reset";
}
