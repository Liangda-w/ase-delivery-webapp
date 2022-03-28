import { INewUserForm } from "../../app/DispatcherApp/components/ModalNewUser";
import { IUser, EUserRole } from "../../interfaces/IUser";
import {
  notificationInternalServerError,
  notificationMongoDBError,
  notificationPermissionError,
  notificationUserNotFound,
  notificationUserStillInUse,
} from "../../assets/notifications/ErrorNotifications";

import {
  notificationDeleteUserSuccess,
  notificationCreateUserSuccess,
  notificationUpdateUserSuccess,
  notificationUpdateUserPasswordSuccess,
} from "../../assets/notifications/SuccessNotifications";

import { getCsrfTokenValue, verifyAccess } from ".";

const API_GATEWAY = process.env.REACT_APP_ASE_ENDPOINT;

type TResponseGetUsers = {
  users: IUser[];
};
export const getUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = [];
  const response = await window.fetch(`${API_GATEWAY}/api/auth/users`, {
    method: "GET",
    headers: {
      "X-XSRF-TOKEN": getCsrfTokenValue(),
    },
    mode: "cors",
    credentials: "include",
  });

  switch (response.status) {
    case 200:
      await response.json().then((userArray: TResponseGetUsers) => {
        userArray.users.forEach((user) => users.push(user as IUser));
      });
      return users;
    case 401:
      notificationPermissionError();
      break;
    case 503:
      notificationInternalServerError();
      break;
    default:
      notificationMongoDBError();
  }

  return users;
};

export const createUser = async (user: INewUserForm): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(`${API_GATEWAY}/api/auth/users/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${getCurrentAccessToken()}`,
        "Content-type": "application/json",
        "X-XSRF-TOKEN": getCsrfTokenValue(),
      },
      credentials: "include",
      redirect: "follow",
      mode: "cors",
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: btoa(user.password),
        roles: [user.roles],
      }),
    });

    switch (response.status) {
      case 201:
        notificationCreateUserSuccess();
        break;
      case 403:
      case 401:
        notificationPermissionError();
        break;
      case 503:
        notificationMongoDBError();
        break;
      default:
        notificationInternalServerError();
    }
    return response.status;
  }
  return 403;
};

export const updateUserInfo = async (
  usernameOld: string,
  usernameNew: string,
  email: string
): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/auth/users/${usernameOld}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        credentials: "include",
        redirect: "follow",
        mode: "cors",
        body: JSON.stringify({
          username: usernameNew,
          email,
        }),
      }
    );

    switch (response.status) {
      case 200:
        notificationUpdateUserSuccess();
        break;
      case 401:
      case 403:
        notificationPermissionError();
        break;
      case 404:
        notificationUserNotFound();
        break;
      case 503:
        notificationInternalServerError();
        break;
      default:
        notificationMongoDBError();
    }
    return response.status;
  }

  return 403;
};

export const upateUserPassword = async (
  username: string,
  password: string
): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/auth/users/${username}/password`,
      {
        method: "PATCH",
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        credentials: "include",
        redirect: "follow",
        mode: "cors",
        body: btoa(password),
      }
    );

    switch (response.status) {
      case 200:
        notificationUpdateUserPasswordSuccess();
        break;
      case 401:
      case 403:
        notificationPermissionError();
        break;
      case 404:
        notificationUserNotFound();
        break;
      case 503:
        notificationInternalServerError();
        break;
      default:
        notificationMongoDBError();
    }
    return response.status;
  }
  return 403;
};

export const udpateUserRole = async (
  username: string,
  oldRole: EUserRole,
  newRole: EUserRole
): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const deleteUserRole = await window.fetch(
      `${API_GATEWAY}/api/auth/users/${username}/roles/${oldRole}`,
      {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        credentials: "include",
        redirect: "follow",
        mode: "cors",
      }
    );

    switch (deleteUserRole.status) {
      case 200: {
        const addUserRole = await window.fetch(
          `${API_GATEWAY}/api/auth/users/${username}/roles/${newRole}`,
          {
            method: "PATCH",
            headers: {
              "X-XSRF-TOKEN": getCsrfTokenValue(),
            },
            credentials: "include",
            redirect: "follow",
            mode: "cors",
          }
        );
        switch (addUserRole.status) {
          case 200:
            return addUserRole.status;
          case 401:
          case 403:
            notificationPermissionError();
            break;
          case 404:
            notificationUserNotFound();
            break;
          case 503:
            notificationInternalServerError();
            break;

          default:
            notificationMongoDBError();
            break;
        }
        return addUserRole.status;
      }

      case 401:
      case 403:
        notificationPermissionError();
        break;
      case 404:
        notificationUserNotFound();
        break;
      case 503:
        notificationInternalServerError();
        break;
      default:
        notificationMongoDBError();
    }
    return deleteUserRole.status;
  }

  return 403;
};

export const deleteUser = async (username: string): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/auth/users/${username}`,
      {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        credentials: "include",
        redirect: "follow",
        mode: "cors",
      }
    );

    switch (response.status) {
      case 200:
        notificationDeleteUserSuccess();
        break;
      case 401:
      case 403:
        notificationPermissionError();
        break;
      case 404:
        notificationUserNotFound();
        break;
      case 409:
        notificationUserStillInUse();
        break;
      case 503:
        notificationInternalServerError();
        break;
      default:
        notificationMongoDBError();
    }
    return response.status;
  }
  return 403;
};
