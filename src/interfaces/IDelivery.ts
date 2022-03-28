import { IBox } from "./IBox";

export enum EDeliveryStatus {
  ORDERED = "ORDERED",
  PICKEDUP = "PICKEDUP",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
}

export interface IDelivery {
  deliveryId: string;
  status: EDeliveryStatus;
  delivererId: string;
  targetBoxId: string;
  customerId: string;
}

export interface IDeliveryBox {
  delivery: IDelivery;
  pickupBox: IBox;
}
