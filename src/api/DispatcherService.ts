import { IBox } from "../interfaces/IBox";
import { IDelivery } from "../interfaces/IDelivery";
import { INewBoxForm } from "../app/DispatcherApp/components/ModalNewBox";
import {
  notificationCreateDeliveryDataError,
  notificationInternalServerError,
  notificationMongoDBError,
  notificationPermissionError,
  notificationUpdateDeliveryError,
  notificationDeleteDeliveryError,
  notificationDeliveryNotFoundError,
  notificationBoxInUseError,
  notificationBoxNotUniqueError,
} from "../assets/notifications/ErrorNotifications";

import {
  notificationCreateDeliverySuccess,
  notificationUpdateDeliverySuccess,
  notificationDeleteDeliverySuccess,
  notificationCreateBoxSuccess,
  notificationDeleteBoxSuccess,
  notificationUpdateBoxSuccess,
} from "../assets/notifications/SuccessNotifications";

import { getCsrfTokenValue, verifyAccess } from ".";

const API_GATEWAY = process.env.REACT_APP_ASE_ENDPOINT;

export const getAllDeliveries = async (): Promise<IDelivery[]> => {
  const deliveries: IDelivery[] = [];
  const response = await window.fetch(
    `${API_GATEWAY}/api/delivery/deliveries`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCsrfTokenValue(),
      },
      mode: "cors",
      credentials: "include",
    }
  );

  switch (response.status) {
    case 200:
      await response.json().then((array: IDelivery[]) => {
        array.forEach((delivery) => deliveries.push(delivery as IDelivery));
      });
      return deliveries;

    case 401:
      notificationPermissionError();
      break;
    case 503:
      notificationInternalServerError();
      break;
    default:
      notificationMongoDBError();
  }

  return deliveries;
};

export const createDelivery = async (delivery: IDelivery): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          status: delivery.status,
          delivererId: delivery.delivererId,
          targetBoxId: delivery.targetBoxId,
          customerId: delivery.customerId,
        }),
      }
    );

    switch (response.status) {
      case 201:
        notificationCreateDeliverySuccess();
        break;
      case 400:
        notificationCreateDeliveryDataError();
        break;
      case 401:
        notificationPermissionError();
        break;
      case 404:
        notificationDeliveryNotFoundError();
        break;
      case 409:
        notificationBoxInUseError();
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

export const updateDelivery = async (delivery: IDelivery): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries?deliveryId=${delivery.deliveryId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(delivery),
      }
    );
    switch (response.status) {
      case 200:
        notificationUpdateDeliverySuccess();
        break;
      case 400:
        notificationUpdateDeliveryError();
        break;
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
    return response.status;
  }
  return 403;
};

export const deleteDelivery = async (
  delivery: IDelivery,
  cascadingDelete = false
): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/deliveries/${delivery.deliveryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
      }
    );

    switch (response.status) {
      case 200:
        if (!cascadingDelete) {
          notificationDeleteDeliverySuccess();
        }
        break;
      case 400:
        notificationDeleteDeliveryError();
        break;
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
    return response.status;
  }
  return 403;
};

// PICK UP BOXES
export const getPickUpBoxes = async (): Promise<IBox[]> => {
  const boxes: IBox[] = [];

  const response = await window.fetch(
    `${API_GATEWAY}/api/delivery/boxes/dispatcher/listPickupBoxes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCsrfTokenValue(),
      },
      mode: "cors",
      credentials: "include",
    }
  );
  switch (response.status) {
    case 200:
      await response.json().then((array: IBox[]) => {
        array.forEach((box) => boxes.push(box as IBox));
      });
      return boxes;
    case 401:
      notificationPermissionError();
      break;
    case 503:
      notificationInternalServerError();
      break;
    default:
      notificationMongoDBError();
  }

  return boxes;
};

export const createPickUpBox = async (box: INewBoxForm): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(`${API_GATEWAY}/api/delivery/boxes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCsrfTokenValue(),
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(box),
    });

    switch (response.status) {
      case 201:
        notificationCreateBoxSuccess();
        break;
      case 409:
        notificationBoxNotUniqueError();
        break;
      case 401:
        notificationPermissionError();
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

export const deletePickUpBox = async (box: IBox): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/boxes/dispatcher/deletePickupBox?boxId=${box.boxId}`,
      {
        method: "DELETE", // => DELETE?????
        headers: {
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
      }
    );

    switch (response.status) {
      case 200:
        notificationDeleteBoxSuccess();
        break;
      case 401:
        notificationPermissionError();
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

export const updatePickUpBox = async (box: IBox): Promise<number> => {
  const accessOk = await verifyAccess();
  if (typeof accessOk !== "number") {
    const response = await window.fetch(
      `${API_GATEWAY}/api/delivery/boxes/${box.boxId}/CLOSED`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": getCsrfTokenValue(),
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          city: box.city,
          name: box.name,
          pickupBoxStatus: box.pickupBoxStatus,
          street: box.street,
          zip: box.zip,
        }),
      }
    );

    switch (response.status) {
      case 200:
        notificationUpdateBoxSuccess();
        break;
      case 401:
        notificationPermissionError();
        break;
      case 409:
        notificationBoxNotUniqueError();
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
