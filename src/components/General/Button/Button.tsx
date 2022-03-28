import React from "react";
import { SCButton } from "./styles";
import { IButton } from "./IButton";

export const Button = ({
  color = "primary",
  type = "default",
  size = "md",
  className = "",
  disabled = false,
  htmlType = "button",
  onClick = () => undefined,
  children,
}: IButton): JSX.Element => (
  <SCButton
    type={htmlType}
    className={[
      type !== "navItem" ? "btn" : "",
      size === "md" ? "" : `btn-${size}`,
      type === "default" ? `btn-${color}` : "",
      type === "outline" ? `btn-outline-${color}` : "",
      type === "navItem" ? "navItem" : "",
      className,
    ].join(" ")}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </SCButton>
);
