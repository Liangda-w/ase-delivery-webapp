import { IDeliveryBox } from "../interfaces/IDelivery";
import {
  notificationInternalServerError,
  notificationMongoDBError,
  notificationPermissionError,
  notificationDeliveryNotFoundError,
  notificationUserNotFound,
} from "../assets/notifications/ErrorNotifications";

import { getCsrfTokenValue, verifyAccess } from ".";

const API_GATEWAY = process.env.REACT_APP_ASE_ENDPOINT;

export const getActiveDeliveries = async (): Promise<IDeliveryBox[]> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries/getActiveDeliveries`,
      {
        method: "GET",
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
      }
    );

    if (response.status === 200) {
      return response.json();
    }

    switch (response.status) {
      case 200:
        return response.json();
      case 401:
        notificationPermissionError();
        break;
      case 404:
        notificationDeliveryNotFoundError();
        break;
      case 503:
        notificationInternalServerError();
        break;
      default:
        notificationMongoDBError();
    }
  }
  return [];
};

export const getPastDeliveries = async (): Promise<IDeliveryBox[]> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries/getPastDeliveries`,
      {
        method: "GET",
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
      }
    );

    switch (response.status) {
      case 200:
        return response.json();
      case 401:
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
  }
  return [];
};
