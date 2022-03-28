import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { IDelivery, EDeliveryStatus } from "../../../../interfaces";
import { RootState } from "../../../state/store";

export interface IDeliveriesState {
  deliveries: IDelivery[];
}

const initialState: IDeliveriesState = {
  deliveries: [],
};

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    setDeliveries(state: IDeliveriesState, action: PayloadAction<IDelivery[]>) {
      state.deliveries = action.payload;
    },
    addDelivery(state: IDeliveriesState, action: PayloadAction<IDelivery>) {
      if (state.deliveries.length > 0) {
        state.deliveries = [...state.deliveries, action.payload];
      } else {
        state.deliveries = [action.payload];
      }
    },
    deleteDelivery(state: IDeliveriesState, action: PayloadAction<IDelivery>) {
      state.deliveries = state.deliveries.filter(
        (delivery) => delivery.deliveryId !== action.payload.deliveryId
      );
    },
    updateDelivery(state: IDeliveriesState, action: PayloadAction<IDelivery>) {
      const deliveryIndex = state.deliveries.findIndex(
        (delivery) => delivery.deliveryId === action.payload.deliveryId
      );
      state.deliveries[deliveryIndex] = action.payload;
    },
  },
});

export const {
  setDeliveries,
  addDelivery,
  updateDelivery,
  deleteDelivery,
} = deliveriesSlice.actions;
export default deliveriesSlice.reducer;

export const getAllDeliveries = createSelector(
  (state: RootState) => state.deliveries.deliveries,
  (deliveries) => {
    return deliveries.map((delivery) => ({ ...delivery }));
  }
);
export const getOpenDeliveries = createSelector(
  (state: RootState) => state.deliveries.deliveries,
  (deliveries) => {
    return deliveries.flatMap((delivery) =>
      delivery.status === EDeliveryStatus.ORDERED ? { ...delivery } : []
    );
  }
);

export const getActiveDeliveries = createSelector(
  (state: RootState) => state.deliveries.deliveries,
  (deliveries) => {
    return deliveries.flatMap((delivery) =>
      delivery.status === EDeliveryStatus.DELIVERED ||
      delivery.status === EDeliveryStatus.PICKEDUP
        ? { ...delivery }
        : []
    );
  }
);

export const getFinishedDeliveries = createSelector(
  (state: RootState) => state.deliveries.deliveries,
  (deliveries) => {
    return deliveries.flatMap((delivery) =>
      delivery.status === EDeliveryStatus.COMPLETED ? { ...delivery } : []
    );
  }
);

export const getPendingDeliveries = createSelector(
  (state: RootState) => state.deliveries.deliveries,
  (deliveries) => {
    return deliveries.filter(
      (delivery) => delivery.status !== EDeliveryStatus.COMPLETED
    );
  }
);
