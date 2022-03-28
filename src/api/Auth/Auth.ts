import {
  notificationInternalServerError,
  notificationMongoDBError,
  notificationPermissionError,
  notificationUserNotFound,
  notificationTimeoutError,
  notificationSessionExpiredError,
} from "../../assets/notifications/ErrorNotifications";
import { IUser } from "../../interfaces";

const API_GATEWAY = process.env.REACT_APP_ASE_ENDPOINT;

export const getCsrfTokenValue = (): string => {
  const allCookies = document.cookie.split(";");
  let xsrfToken = "";
  if (allCookies.length > 0) {
    allCookies.forEach((cookie) => {
      if (cookie.includes("XSRF-TOKEN")) {
        // eslint-disable-next-line prefer-destructuring
        xsrfToken = cookie.split("=")[1];
      }
    });
  }
  return xsrfToken;
};

export const getCsrfToken = async (): Promise<number> => {
  const response = await window.fetch(`${API_GATEWAY}/api/auth/token/csrf`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": `${API_GATEWAY}`,
      "X-XSRF-TOKEN": "",
    },
    mode: "cors",
    credentials: "include",
    redirect: "follow",
  });

  switch (response.status) {
    case 200:
      return 200;
    case 401:
      notificationPermissionError();
      break;
    case 500:
    case 503:
    case 504:
      notificationTimeoutError();
      break;
    default:
      notificationMongoDBError();
      break;
  }
  return 500;
};

export const authenticate = async (
  username: string,
  password: string
): Promise<IUser | undefined> => {
  const response = await window.fetch(`${API_GATEWAY}/api/auth/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "X-XSRF-TOKEN": getCsrfTokenValue(),
    },
    mode: "cors",
    credentials: "include",
    redirect: "follow",
  });

  switch (response.status) {
    case 200:
      return response.json();
    case 401:
    case 403:
      notificationPermissionError();
      break;
    case 404:
    case 400:
      notificationUserNotFound();
      break;
    case 500:
    case 503:
      notificationInternalServerError();
      break;
    default:
      notificationMongoDBError();
  }
  return undefined;
};

export const logout = async (): Promise<number> => {
  const response = await window.fetch(`${API_GATEWAY}/api/auth/logout`, {
    method: "GET",
    headers: {
      "X-XSRF-TOKEN": getCsrfTokenValue(),
    },
    mode: "cors",
    credentials: "include",
    redirect: "follow",
  });

  return response.status;
};

export const verifyAccess = async (
  withLogout = true
): Promise<IUser | number> => {
  const response = await window.fetch(
    `${API_GATEWAY}/api/auth/verify-access?type=GET`,
    {
      method: "GET",
      headers: {
        "X-XSRF-TOKEN": getCsrfTokenValue(),
      },
      mode: "cors",
      credentials: "include",
      redirect: "follow",
    }
  );

  if (response.status !== 200) {
    if (withLogout) {
      notificationSessionExpiredError();
      document.location.href = "/";
    }

    return response.status;
  }

  return response.json();
};
