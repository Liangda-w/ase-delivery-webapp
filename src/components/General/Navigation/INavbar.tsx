import React from "react";

export interface INavbar {
  /**
   * navitems
   */
  children?: React.ReactNode;
  /**
   * Link to URL when clicking on the icon
   */
  to?: string;
}
