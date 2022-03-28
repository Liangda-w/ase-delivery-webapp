import { store } from "react-notifications-component";

export type TNotificationType = "success" | "danger" | "warning" | "info";

export const baseNotification = (
  type: TNotificationType,
  title: string,
  message: string
): void => {
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
  });
};

export const baseSuccessNotification = (
  title: string,
  message: string
): void => {
  baseNotification("success", title, message);
};

export const baseDangerNotification = (
  title: string,
  message: string
): void => {
  baseNotification("danger", title, message);
};

export const baseInfoNotification = (title: string, message: string): void => {
  baseNotification("info", title, message);
};
