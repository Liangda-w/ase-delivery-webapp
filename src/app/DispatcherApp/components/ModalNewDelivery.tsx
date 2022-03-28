/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IModalObject,
  IModalTemplate,
} from "../../../components/General/Modal/Template/IModalTemplates";
import { Modal } from "../../../components/General/Modal/Modal";
import { ModalHeader } from "../../../components/General/Modal/ModalHeader/ModalHeader";
import { ModalTitle } from "../../../components/General/Modal/ModalTitle/ModalTitle";
import { ModalBody } from "../../../components/General/Modal/ModalBody/ModalBody";
import { ModalFooter } from "../../../components/General/Modal/ModalFooter/ModalFooter";
import { Select } from "../../../components";
import { EDeliveryStatus, IBox, IUser } from "../../../interfaces";
import { createDelivery, getAllDeliveries } from "../../../api";

// Store
import { useAppSelector, useAppDispatch } from "../../state/hooks/userHook";
import {
  setDeliveries,
  getCustomers,
  getDeliverers,
  getBoxes,
  getPendingDeliveries,
} from "../state";

interface IFormValues {
  customer: string;
  deliverer: string;
  box: string;
}

export const useModalNewDelivery = ({
  close,
  confirm,
}: IModalTemplate): IModalObject => {
  const dispatch = useAppDispatch();
  const boxes = useAppSelector(getBoxes);
  const deliverers = useAppSelector(getDeliverers);
  const customers = useAppSelector(getCustomers);
  const pendingDeliveries = useAppSelector(getPendingDeliveries);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [boxOptions, setBoxOptions] = useState<IBox[]>(boxes);

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

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
    createDelivery({
      status: EDeliveryStatus.ORDERED,
      customerId: data.customer,
      delivererId: data.deliverer,
      deliveryId: "",
      targetBoxId: data.box,
    }).then((responseStatus: number) => {
      handleConfirm();
      if (responseStatus === 201) {
        getAllDeliveries().then((responseDeliveries) => {
          if (responseDeliveries.length > 0) {
            dispatch(setDeliveries(responseDeliveries));
          }
        });
      }
    });
  };

  const markup: JSX.Element = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={isOpen} onClose={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Create Delivery Job</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Select
            key="customer"
            wrapperClasses="mb-3"
            label="Customer"
            register={register}
            formKey="customer"
            errors={{
              required: { value: true, message: "This is a required field." },
            }}
            isValid={errors.customer === undefined}
            invalidFeedback={errors.customer?.message}
            onChange={(event) => {
              const availableBoxes: string[] = [];
              pendingDeliveries.forEach((delivery) => {
                if (delivery.customerId === event.target.value) {
                  availableBoxes.push(delivery.targetBoxId);
                }
              });

              const possibleBoxes = [
                ...boxes.filter((box) => !box.inUse),
                ...boxes.filter((box) => availableBoxes.includes(box.boxId)),
              ];
              setBoxOptions(possibleBoxes);
            }}
          >
            {customers.map((customer: IUser) => (
              <option key={customer.id} value={customer.id}>
                {`${customer.username}, ${customer.email}`}
              </option>
            ))}
          </Select>
          <Select
            key="deliverer"
            wrapperClasses="mb-3"
            label="Assign Deliverer"
            register={register}
            formKey="deliverer"
            errors={{
              required: { value: true, message: "This is a required field." },
            }}
            isValid={errors.deliverer === undefined}
            invalidFeedback={errors.deliverer?.message}
          >
            {deliverers.map((deliverer: IUser) => (
              <option
                key={`${deliverer.id}-${deliverer.username}`}
                value={deliverer.id}
              >
                {`${deliverer.username}, ${deliverer.email}`}
              </option>
            ))}
          </Select>
          <Select
            key="box"
            wrapperClasses="mb-3"
            label="Select destination box"
            register={register}
            formKey="box"
            defaultValue=""
            errors={{
              required: { value: true, message: "This is a required field." },
            }}
            isValid={errors.box === undefined}
            invalidFeedback={errors.box?.message}
          >
            {boxOptions.length > 0 ? (
              boxOptions.map((box: IBox) => (
                <option
                  value={box.boxId}
                  key={`${box.zip}-${box.name.replace(" ", "-")}`}
                >
                  {box.name}
                  {" - "}
                  {`${box.street}, ${box.zip}, ${box.city}`}
                </option>
              ))
            ) : (
              <option disabled>
                No boxes available. Create a new pick up box first.
              </option>
            )}
          </Select>
        </ModalBody>
        <ModalFooter
          modalActions={[
            { children: "Cancel", color: "secondary", onClick: handleClose },
            {
              children: "Create New Delivery",
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
