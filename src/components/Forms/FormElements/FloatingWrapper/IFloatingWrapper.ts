import React from "react";

export interface IFloatingWrapper {
  /**
   * Additional CSS classes
   */
  classes?: string;
  /**
   * Children of the component (Form Elements)
   */
  children: React.ReactNode;
  /**
   * Added because for select multiple the floating
   * label is not supported
   */
  unfloat?: boolean;
}
