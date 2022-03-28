import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDelivery, IBox } from "../../../../interfaces";
import { RootState } from "../../../state";

export interface IDeliveriesState {
  activeDeliveries: IDelivery[];
  activeDeliveriesBoxes: IBox[];
  pastDeliveries: IDelivery[];
  pastDeliveriesBoxes: IBox[];
}

const initialState: IDeliveriesState = {
  activeDeliveries: [],
  activeDeliveriesBoxes: [],
  pastDeliveries: [],
  pastDeliveriesBoxes: [],
};

const customerDeliveriesSlice = createSlice({
  name: "customerDeliveries",
  initialState,
  reducers: {
    setActiveDeliveries(
      state: IDeliveriesState,
      action: PayloadAction<IDelivery[]>
    ) {
      state.activeDeliveries = action.payload;
    },
    setActiveDeliveriesBoxes(
      state: IDeliveriesState,
      action: PayloadAction<IBox[]>
    ) {
      state.activeDeliveriesBoxes = action.payload;
    },
    setPastDeliveries(
      state: IDeliveriesState,
      action: PayloadAction<IDelivery[]>
    ) {
      state.pastDeliveries = action.payload;
    },
    setPastDeliveriesBoxes(
      state: IDeliveriesState,
      action: PayloadAction<IBox[]>
    ) {
      state.pastDeliveriesBoxes = action.payload;
    },
  },
});

export const {
  setActiveDeliveries,
  setActiveDeliveriesBoxes,
  setPastDeliveries,
  setPastDeliveriesBoxes,
} = customerDeliveriesSlice.actions;

export const getActiveDeliveriesTableData = createSelector(
  (state: RootState) => state.customerDeliveries.activeDeliveries,
  (state: RootState) => state.customerDeliveries.activeDeliveriesBoxes,
  (activeDeliveries, activeDeliveriesBoxes) => {
    return activeDeliveries.map((delivery: IDelivery) => {
      const assignedBox: IBox | undefined = activeDeliveriesBoxes.find(
        (box: IBox) => box.boxId === delivery.targetBoxId
      );
      return {
        ...delivery,
        address: assignedBox
          ? `${assignedBox.name}, ${assignedBox.street}, ${assignedBox.zip}, ${assignedBox.city}`
          : "No data found",
      };
    });
  }
);

export const getPastDeliveriesTableData = createSelector(
  (state: RootState) => state.customerDeliveries.pastDeliveries,
  (state: RootState) => state.customerDeliveries.pastDeliveriesBoxes,
  (pastDeliveries, pastDeliveriesBoxes) => {
    return pastDeliveries.map((delivery: IDelivery) => {
      const assignedBox: IBox | undefined = pastDeliveriesBoxes.find(
        (box: IBox) => box.boxId === delivery.targetBoxId
      );
      return {
        ...delivery,
        address: assignedBox
          ? `${assignedBox.name}, ${assignedBox.street}, ${assignedBox.zip}, ${assignedBox.city}`
          : "No data found",
      };
    });
  }
);

export default customerDeliveriesSlice.reducer;
