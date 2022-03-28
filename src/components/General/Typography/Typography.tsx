import React from "react";
import { SCTypography } from "./styles";
import { ITypography } from "./ITypography";

export const Typography: React.FC<ITypography> = ({
  variant = "p",
  display = "block",
  align = "start",
  noWrap = false,
  classes = "",
  component,
  color = "none",
  children,
  gutterBottom = true,
  italic = false,
  ...props
}: ITypography) => (
  <SCTypography
    className={[
      "typography",
      `d-${display}`,
      align !== "start" ? `text-${align}` : "",
      noWrap ? "text--noWrap" : "",
      italic ? "fst-italic" : "",
      `text-${color}`,
      gutterBottom
        ? `${
            variant.includes("h")
              ? "typography--headline--mb"
              : "typography--body--mb"
          }`
        : "typography--mb-0",
      variant.includes("h") ? "typography--headline" : "typography--body",
      `typography--${variant}`,
      classes,
    ].join(" ")}
    {...props}
    as={variant === "psmall" ? "p" : component || variant}
  >
    {children}
  </SCTypography>
);
