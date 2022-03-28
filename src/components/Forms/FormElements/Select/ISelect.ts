import React from "react";
import { IFormElement } from "../IFormElement";

export interface ISelect extends IFormElement {
  /**
   * Select Options
   */
  children: React.ReactNode;
  /**
   * size of the select attribute
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether multiple options are allowed to be selected
   */
  multiple?: boolean;
  /**
   * Text which is initially selected, but not a real
   * select option
   */
  description?: string;
  /**
   * possible onChange handler
   */
  onChange?: (event: any) => void;
}

/** Interface and Type Definition for Form composition */
type TOption = {
  /**
   * Value of the option
   */
  value: string | number;
  /**
   * Label of the option
   */
  label?: string;
  /**
   * Whether the option is selected
   */
  selected?: boolean;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
};

export interface ISelectProps extends Omit<ISelect, "children"> {
  /**
   * options of the select component
   */
  options: TOption[];
}
