import { Dispatch, SetStateAction } from "react";
import { IDelivery } from "../../../../interfaces";

export interface IModalObject {
  open: Dispatch<SetStateAction<boolean>>;
  markup: JSX.Element;
}

export interface IModalTemplate {
  close: () => void;
  confirm: () => void;
}
export interface IDeliveryInfoTemplate {
  delivery: IDelivery;
}
