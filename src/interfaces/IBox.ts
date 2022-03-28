import { EDeliveryStatus } from "./IDelivery";

export interface IBox {
  boxId: string;
  city: string;
  name: string;
  pickupBoxStatus: string;
  street: string;
  zip: string;
}

export interface IAssignedBox {
  pickupBox: IBox;
  deliveryStatus: EDeliveryStatus;
}
