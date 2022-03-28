import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { SCLink } from "./styles";
import { ILink } from "./ILink";

/**
 * Link is based on the button component
 * regarding styling and the interface.
 * For an anchor tag, the onClick event
 * handler was removed, since links should
 * only be used for navigation purposes.
 */
export const Link = ({
  color = "secondary",
  type = "link",
  size = "md",
  classes = "",
  to,
  route = false,
  children,
}: ILink): JSX.Element => (
  <SCLink
    className={[
      type === "link" ? `link-${color} link-${size}` : "",
      type === "default" ? `btn btn-${color} btn-${size}` : "",
      type === "outline" ? `btn btn-outline-${color} btn-${size}` : "",
      type === "navItem" ? "navItem" : "",
      classes,
    ].join(" ")}
    href={route || typeof to !== "string" ? "" : to}
    to={route ? to : ""}
    as={route ? RouterLink : "a"}
  >
    {children}
  </SCLink>
);
