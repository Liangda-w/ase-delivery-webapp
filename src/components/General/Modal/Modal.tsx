import React from "react";
import { Modal as ModalBootstrap } from "react-bootstrap";
import { IModal } from "./IModal";

export const Modal = ({
  children,
  className = "",
  open,
  onClose,
  centered = true,
  size = "md",
  backdrop = true,
  scrollable = true,
  ...props
}: IModal): JSX.Element => (
  <ModalBootstrap
    show={open}
    onHide={onClose}
    backdrop={!backdrop ? "static" : backdrop}
    className={className}
    centered={centered}
    size={size === "md" ? undefined : size} // undefined becaus of react-bootstrap Modal interface
    scrollable={scrollable}
    {...props}
  >
    {children}
  </ModalBootstrap>
);
