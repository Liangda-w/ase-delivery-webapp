import { baseSuccessNotification } from "./notifications";

/** GENERAL SUCCESS */
export const notificationRetrievalSuccess = (): void => {
  baseSuccessNotification(
    "Request succesful!",
    "Your requested data have been retrieved."
  );
};

/** USER */
export const notificationCreateUserSuccess = (): void => {
  baseSuccessNotification("Success!", "A new user was added to the database.");
};

export const notificationUpdateUserSuccess = (): void => {
  baseSuccessNotification("Success!", "The user was updated.");
};

export const notificationUpdateUserPasswordSuccess = (): void => {
  baseSuccessNotification("Success!", "The password was updated.");
};
export const notificationDeleteUserSuccess = (): void => {
  baseSuccessNotification(
    "Success!",
    "The user was removed permanently from the database."
  );
};

/** DELIVERY */
export const notificationCreateDeliverySuccess = (): void => {
  baseSuccessNotification("Delivery created!", "A new delivery was created.");
};

export const notificationUpdateDeliverySuccess = (): void => {
  baseSuccessNotification(
    "Delivery updated!",
    "The delivery metadata were updated."
  );
};

export const notificationDeleteDeliverySuccess = (): void => {
  baseSuccessNotification(
    "Delivery deleted!",
    "The delivery is no longer in the database."
  );
};

export const notificationDeleteUserDeliverySuccess = (): void => {
  baseSuccessNotification(
    "Deliveries deleted!",
    "The deliveries associated with the user were deleted as well."
  );
};

/** BOX */
export const notificationCreateBoxSuccess = (): void => {
  baseSuccessNotification(
    "New Pickup Box created!",
    "A new Pickup Box was added to the system."
  );
};

export const notificationDeleteBoxSuccess = (): void => {
  baseSuccessNotification(
    "Pickup box deleted.",
    "The pickup box is no longer in the system."
  );
};

export const notificationUpdateBoxSuccess = (): void => {
  baseSuccessNotification(
    "Pickup box deleted.",
    "The pickup box is no longer in the system."
  );
};

/** CUSTOMER */
export const notificationCollectDeliveriesSuccess = (): void => {
  baseSuccessNotification(
    "Deliveries collected!",
    "Your pick up box is now empty again."
  );
};
