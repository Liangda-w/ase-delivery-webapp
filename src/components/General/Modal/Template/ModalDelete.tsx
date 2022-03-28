.lightimport React, { useState } from "react";
import { IModalObject, IModalTemplate } from "./IModalTemplates";
import { Modal } from "../Modal";
import { ModalHeader } from "../ModalHeader/ModalHeader";
import { ModalTitle } from "../ModalTitle/ModalTitle";
import { ModalBody } from "../ModalBody/ModalBody";
import { ModalFooter } from "../ModalFooter/ModalFooter";

export const useModalDelete = ({
  close,
  confirm,
}: IModalTemplate): IModalObject => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    close();
    setIsOpen(false);
  };
  const handleConfirm = () => {
    confirm();
    setIsOpen(false);
  };

  const markup: JSX.Element = (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Confirm Deletion</ModalTitle>
      </ModalHeader>
      <ModalBody>
        Are you sure that you want to delete the selected item(s) permanently?
      </ModalBody>
      <ModalFooter
        modalActions={[
          { children: "Cancel", color: "secondary", onClick: handleClose },
          { children: "Yes", color: "primary", onClick: handleConfirm },
        ]}
      />
    </Modal>
  );

  return { open: setIsOpen, markup };
};
