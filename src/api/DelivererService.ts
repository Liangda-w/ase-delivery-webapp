import { getCsrfTokenValue, verifyAccess } from ".";
import {
  notificationInternalServerError,
  notificationMongoDBError,
  notificationPermissionError,
  notificationUserNotFound,
} from "../assets/notifications/ErrorNotifications";
import { IBox, IDelivery, IDeliveryBox } from "../interfaces";

const API_GATEWAY = process.env.REACT_APP_ASE_ENDPOINT;

export const getAssignedDeliveries = async (): Promise<IDeliveryBox[]> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries/getDelivererDeliveries`,
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

export const getAssignedBoxes = async (): Promise<IBox[]> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/boxes/deliverer/assignedPickupBoxes`,
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

export const pickupDelivery = async (
  deliveryIds: string[]
): Promise<IDelivery[]> => {
  const response = await window.fetch(
    `${API_GATEWAY}/api/delivery/deliveries/pickUpDeliveries`,
    {
      method: "PATCH",
      headers: {
        "X-XSRF-TOKEN": getCsrfTokenValue(),
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(deliveryIds),
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
      notificationMongoDBError();
      break;
    default:
      notificationInternalServerError();
  }
  return [];
};
