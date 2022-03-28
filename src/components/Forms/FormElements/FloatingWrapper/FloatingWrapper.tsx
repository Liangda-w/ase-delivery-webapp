import React from "react";
import { IFloatingWrapper } from "./IFloatingWrapper";

export const FloatingWrapper: React.FC<IFloatingWrapper> = ({
  children,
  classes = "",
  unfloat = false,
  ...props
}: IFloatingWrapper) => (
  <div
    className={[classes, unfloat ? "" : "form-floating"].join(" ")}
    {...props}
  >
    {children}
  </div>
);
