import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBox, IDelivery, IDeliveryBox } from "../../../../interfaces";
import { RootState } from "../../../state";

export interface IBoxesState {
  assignedDeliveries: IDeliveryBox[];
  assignedBoxes: IBox[];
}

const initialState: IBoxesState = {
  assignedDeliveries: [],
  assignedBoxes: [],
};

const assignedDeliveriesSlice = createSlice({
  name: "assignedDeliveries",
  initialState,
  reducers: {
    setAssignedDeliveries(
      state: IBoxesState,
      action: PayloadAction<IDeliveryBox[]>
    ) {
      state.assignedDeliveries = action.payload;
    },
    setAssignedBoxes(state: IBoxesState, action: PayloadAction<IBox[]>) {
      state.assignedBoxes = action.payload;
      console.log(state.assignedBoxes);
    },
    updateDelivery(state: IBoxesState, action: PayloadAction<IDelivery>) {
      const deliveryIndex = state.assignedDeliveries.findIndex(
        (delivery) => delivery.delivery.deliveryId === action.payload.deliveryId
      );
      state.assignedDeliveries[deliveryIndex].delivery = action.payload;
    },
  },
});

export const {
  setAssignedDeliveries,
  setAssignedBoxes,
  updateDelivery,
} = assignedDeliveriesSlice.actions;

export const getAssignedDeliveries = createSelector(
  (state: RootState) => state.assignedDeliveries.assignedDeliveries,
  (assignedDeliveries) => {
    return assignedDeliveries.map((delivery) => ({ ...delivery }));
  }
);

export const getAssignedBoxes = createSelector(
  (state: RootState) => state.assignedDeliveries.assignedBoxes,
  (assignedBoxes) => {
    return assignedBoxes.map((box) => ({ ...box }));
  }
);

export default assignedDeliveriesSlice.reducer;
