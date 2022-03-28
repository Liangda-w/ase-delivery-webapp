import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { IBox, EDeliveryStatus, IDelivery } from "../../../../interfaces";
import { RootState } from "../../../state";

export interface IBoxState {
  boxes: IBox[];
}

const initialState: IBoxState = {
  boxes: [],
};

const boxSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    setBoxes(state: IBoxState, action: PayloadAction<IBox[]>) {
      state.boxes = action.payload;
    },
    addBox(state: IBoxState, action: PayloadAction<IBox>) {
      if (state.boxes.length > 0) {
        state.boxes = [...state.boxes, action.payload];
      } else {
        state.boxes = [action.payload];
      }
    },
    deleteBox(state: IBoxState, action: PayloadAction<IBox>) {
      state.boxes = state.boxes.filter(
        (box) => box.boxId !== action.payload.boxId
      );
    },
    updateBox(state: IBoxState, action: PayloadAction<IBox>) {
      const boxIndex = state.boxes.findIndex(
        (box) => box.boxId === action.payload.boxId
      );
      state.boxes[boxIndex] = action.payload;
    },
  },
});

export const { setBoxes, addBox, deleteBox, updateBox } = boxSlice.actions;
export default boxSlice.reducer;

export const getBoxes = createSelector(
  (state: RootState) => state.boxes.boxes,
  (state: RootState) => state.deliveries.deliveries,
  (boxes, deliveries) => {
    const pendingDeliveries: IDelivery[] = deliveries.filter(
      (delivery) => delivery.status !== EDeliveryStatus.COMPLETED
    );

    return boxes.map((box) => ({
      ...box,
      inUse: pendingDeliveries.some(
        (delivery: IDelivery) => delivery.targetBoxId === box.boxId
      ),
    }));
  }
);
