import React from "react";
import { SCModalBody } from "../styles";
import { IModalBody } from "./IModalBody";

export const ModalBody = ({
  children,
  className = "",
  ...props
}: IModalBody) => (
  <SCModalBody className={[className, "modal-body"].join(" ")} {...props}>
    {children}
  </SCModalBody>
);
