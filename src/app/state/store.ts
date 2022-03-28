import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import boxReducer from "../DispatcherApp/state/slices/boxSlice";
import deliveriesReducer from "../DispatcherApp/state/slices/deliveriesSlice";
import customerDeliveriesReducer from "../CustomerApp/state/slices/customerDeliveriesSlice";
import assignedDeliveriesReducer from "../DelivererApp/state/slices/assignedDeliveriesSlice";
import usersReducer from "../DispatcherApp/state/slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    boxes: boxReducer,
    deliveries: deliveriesReducer,
    users: usersReducer,
    customerDeliveries: customerDeliveriesReducer,
    assignedDeliveries: assignedDeliveriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
