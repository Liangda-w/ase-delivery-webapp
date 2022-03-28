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
  Select,
  Input,
} from "../../../components";

import { useAppDispatch } from "../../state/hooks/userHook";
import { setUsers } from "../state";
import { createUser, getUsers } from "../../../api";
import { EUserRole } from "../../../interfaces";

export interface INewUserForm {
  username: string;
  email: string;
  password: string;
  roles: EUserRole;
}

export const useModalNewUser = ({
  close,
  confirm,
}: IModalTemplate): IModalObject => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewUserForm>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    reset();
    close();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    confirm();
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<INewUserForm> = (data) => {
    createUser(data).then((responseStatus: number) => {
      reset();

      if (responseStatus === 201) {
        getUsers().then((responseUsers) => {
          if (responseUsers.length > 0) {
            dispatch(setUsers(responseUsers));
          }
        });
        handleConfirm();
      }
    });
  };

  const markup: JSX.Element = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={isOpen} onClose={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Create New ASE User</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            register={register}
            formKey="username"
            wrapperClasses="mb-3"
            defaultValue=""
            key="username"
            label="Username"
            errors={{
              required: { value: true, message: "This is a required field." },
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Your input does not match the required pattern.",
              },
            }}
            isValid={errors.username === undefined}
            invalidFeedback={errors.username?.message}
          />

          <Input
            type="email"
            register={register}
            formKey="email"
            wrapperClasses="mb-3"
            defaultValue=""
            key="email"
            label="E-Mail"
            errors={{
              required: { value: true, message: "This is a required field." },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please provide a valid E-Mail address.",
              },
            }}
            isValid={errors.email === undefined}
            invalidFeedback={errors.email?.message}
          />
          <Input
            type="password"
            register={register}
            formKey="password"
            wrapperClasses="mb-3"
            key="password"
            label="Password"
            errors={{
              required: { value: true, message: "This is a required field." },
              minLength: {
                value: 4,
                message: "Your password must contain at least 4 characters.",
              },
              maxLength: {
                value: 100,
                message: "Your password can contain at most 100 characters.",
              },
            }}
            isValid={errors.password === undefined}
            invalidFeedback={errors.password?.message}
          />
          <Select
            key="roles"
            defaultValue=""
            wrapperClasses="mb-3"
            label="User role"
            register={register}
            formKey="roles"
            errors={{
              required: { value: true, message: "This is a required field." },
            }}
            isValid={errors.roles === undefined}
            invalidFeedback={errors.roles?.message}
          >
            <option value={EUserRole.CUSTOMER}>Customer</option>
            <option value={EUserRole.DELIVERER}>Deliverer</option>
            <option value={EUserRole.DISPATCHER}>Dispatcher</option>
          </Select>
        </ModalBody>
        <ModalFooter
          modalActions={[
            { children: "Cancel", color: "secondary", onClick: handleClose },
            {
              children: "Create New User",
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
