import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IModalObject,
  IModalTemplate,
} from "../../../components/General/Modal/Template/IModalTemplates";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Input,
} from "../../../components";

import { useAppDispatch } from "../../state/hooks/userHook";
import { setBoxes } from "../state";
import { createPickUpBox, getPickUpBoxes } from "../../../api";

export interface INewBoxForm {
  name: string;
  street: string;
  zip: string;
  city: string;
}

export const useModalNewBox = ({
  close,
  confirm,
}: IModalTemplate): IModalObject => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewBoxForm>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    close();
    reset();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    confirm();
    reset();
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<INewBoxForm> = (data) => {
    createPickUpBox(data).then((responseStatus: number) => {
      handleConfirm();
      if (responseStatus === 201) {
        getPickUpBoxes().then((responseBox) => {
          if (responseBox.length > 0) {
            dispatch(setBoxes(responseBox));
          }
        });
      }
    });
  };

  const markup: JSX.Element = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={isOpen} onClose={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Create New Pickup Box</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            register={register}
            formKey="name"
            wrapperClasses="mb-3"
            defaultValue=""
            key="name"
            label="Name"
            errors={{
              required: { value: true, message: "This is a required field." },
              minLength: {
                value: 3,
                message:
                  "A box name has to be contained of at least 3 characters.",
              },
              maxLength: {
                value: 100,
                message:
                  "A box name has to be contained of at most 100 characters.",
              },
            }}
            isValid={errors.name === undefined}
            invalidFeedback={errors.name?.message}
          />

          <Input
            type="text"
            register={register}
            formKey="street"
            wrapperClasses="mb-3"
            key="street"
            label="Street, Housenumber"
            defaultValue=""
            errors={{
              required: { value: true, message: "This is a required field." },
              // pattern: {
              //   value: /^([\w\ß[:punct:] ]+) ([0-9]{1,5})([\w[:punct:]-/]*)$/,
              //   message: "Please provide a valid address.",
              // },
            }}
            isValid={errors.street === undefined}
            invalidFeedback={errors.street?.message}
          />
          <Input
            type="text"
            register={register}
            formKey="zip"
            wrapperClasses="mb-3"
            key="zip"
            label="Zip Code"
            defaultValue=""
            errors={{
              required: { value: true, message: "This is a required field." },
              minLength: {
                value: 4,
                message: "Your zip code must contain at least 4 characters.",
              },
              maxLength: {
                value: 20,
                message: "A zip code can not be longer than 20 characters",
              },
              pattern: {
                value: /^[A-Z0-9-]{4,20}$/,
                message: "Invalid zip code.",
              },
            }}
            isValid={errors.zip === undefined}
            invalidFeedback={errors.zip?.message}
          />
          <Input
            type="text"
            register={register}
            formKey="city"
            wrapperClasses="mb-3"
            key="city"
            label="City"
            defaultValue=""
            errors={{
              required: { value: true, message: "This is a required field." },
              pattern: {
                value: /^[a-zA-Z0-9-\s]{1,50}$/,
                message: "Invalid city.",
              },
            }}
            isValid={errors.city === undefined}
            invalidFeedback={errors.city?.message}
          />
        </ModalBody>
        <ModalFooter
          modalActions={[
            { children: "Cancel", color: "secondary", onClick: handleClose },
            {
              children: "Create New Pickup Box",
              color: "primary",
              htmlType: "submit",
              onClick: handleSubmit(onSubmit),
            },
          ]}
        />
      </Modal>
    </form>
  );

  return { open: setIsOpen, markup };
};
