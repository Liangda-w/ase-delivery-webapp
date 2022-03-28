import React from "react";
import { ICol, TColNumber } from "./ICol";

const getBreakpointProperties = (breakpoint: TColNumber) => {
  let breakpointProps = "";
  const bp = Object.keys(breakpoint)[0];
  switch (typeof breakpoint) {
    case "boolean":
      breakpointProps = `col-${bp}`;
      break;
    case "number":
      breakpointProps = `col-${bp}-${breakpoint}`;
      break;
    case "string":
      breakpointProps = `col-${bp}-auto`;
      break;
    case "object":
      if (typeof breakpoint.span !== "undefined") {
        if (typeof breakpoint.span === "number") {
          breakpointProps = `col-${bp}-${breakpoint.span}`;
        } else if (breakpoint.span === "auto") {
          breakpointProps = `col-${bp}-auto`;
        } else if (breakpoint.span) {
          breakpointProps = `col-${bp}`;
        }
      }
      if (typeof breakpoint.offset !== "undefined") {
        breakpointProps += ` offset-${bp}-${breakpoint.offset}`;
      }
      if (typeof breakpoint.order !== "undefined") {
        breakpointProps += ` order-${bp}-${breakpoint.order}`;
      }
      break;
    default:
      break;
  }
  return breakpointProps;
};

export const Col = ({
  lg,
  md,
  // sm,
  // xl,
  xs,
  className = "",
  children,
  ...props
}: ICol): JSX.Element => {
  const colLg = lg ? getBreakpointProperties(lg) : "";
  const colMd = md ? getBreakpointProperties(md) : "";
  // const colSm = sm ? getBreakpointProperties(sm) : "";
  // const colXl = xl ? getBreakpointProperties(xl) : "";
  const colXs = xs ? getBreakpointProperties(xs) : "";

  return (
    <div
      className={[
        `${
          colLg !== "" ||
          colMd !== "" ||
          // colSm !== "" ||
          // colXl !== "" ||
          colXs !== ""
            ? ""
            : "col"
        }`,
        colLg,
        colMd,
        // colSm,
        // colXl,
        colXs,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};
