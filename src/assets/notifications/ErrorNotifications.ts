import { baseDangerNotification } from "./notifications";

/** GENERAL ERRORS */
export const notificationInternalServerError = (): void => {
  baseDangerNotification(
    "Internal Server Error!",
    "Please contact tech support."
  );
};

export const notificationTimeoutError = (): void => {
  baseDangerNotification(
    "Gateway Timeout!",
    "There has been no response from the server so far."
  );
};

export const notificationMongoDBError = (): void => {
  baseDangerNotification("MongoDB down!", "Please try again later.");
};

export const notificationSessionExpiredError = (): void => {
  baseDangerNotification("Session expired!", "You were logged out.");
};

/** USER ERRORS */
export const notificationUserNotFound = (): void => {
  baseDangerNotification(
    "User not found!",
    "The user may not have been created or is already deleted."
  );
};

export const notificationUserStillInUse = (): void => {
  baseDangerNotification(
    "Can't be deleted!",
    "There are still active deliveries assigned to the user."
  );
};

/** AUTH ERRORS */
export const notificationPasswordError = (): void => {
  baseDangerNotification("Password incorrect!", "Please try again.");
};

export const notificationPermissionError = (): void => {
  baseDangerNotification(
    "Permission denied!",
    "You don't have access to this resource."
  );
};

/** DELIVERY  */
export const notificationCreateDeliveryDataError = (): void => {
  baseDangerNotification(
    "Invalid delivery object!",
    "The provided delivery data is invalid"
  );
};

export const notificationUpdateDeliveryError = (): void => {
  baseDangerNotification("Update error!", "The delivery could not be updated.");
};

export const notificationDeleteDeliveryError = (): void => {
  baseDangerNotification(
    "Deletion error!",
    "The delivery could not be deleted."
  );
};

export const notificationDeliveryNotFoundError = (): void => {
  baseDangerNotification(
    "Delivery not found!",
    "The delivery does not exist in the database."
  );
};

export const notificationBoxInUseError = (): void => {
  baseDangerNotification(
    "Box already in use!",
    "This box can not be assigned."
  );
};

// BOX
export const notificationBoxNotUniqueError = (): void => {
  baseDangerNotification(
    "Box name already exists!",
    "A box name has to be unique."
  );
};
