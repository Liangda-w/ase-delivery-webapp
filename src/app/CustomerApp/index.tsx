import React from "react";

// REDUX STORE
import { useAppDispatch } from "../state/hooks/userHook";
import {
  setActiveDeliveries,
  setActiveDeliveriesBoxes,
  setPastDeliveries,
  setPastDeliveriesBoxes,
} from "./state";

// COMPONENTS
import { Navbar } from "../../components";

// INTERACES
import { IBox, IDelivery, IUser } from "../../interfaces";

// API
import { getActiveDeliveries, getPastDeliveries } from "../../api";

// SCREENS
import { LoadingScreen } from "../../screens";
import { HomeScreen } from "./screens";

interface ICustomerApp {
  user: IUser;
}

export const CustomerApp = ({ user }: ICustomerApp): JSX.Element => {
  const dispatch = useAppDispatch();

  const [initialize, setInitialize] = React.useState(false);

  if (!initialize) {
    getActiveDeliveries().then((responseActiveDeliveries) => {
      if (responseActiveDeliveries.length > 0 && user.roles.length > 0) {
        const activeDeliveries: IDelivery[] = [];
        responseActiveDeliveries.forEach((deliveryBoxObject) =>
          activeDeliveries.push({ ...deliveryBoxObject.delivery })
        );
        dispatch(setActiveDeliveries(activeDeliveries));

        const activeBoxes: IBox[] = [];
        responseActiveDeliveries.forEach((deliveryBoxObject) => {
          activeBoxes.push({ ...deliveryBoxObject.pickupBox });
        });
        dispatch(setActiveDeliveriesBoxes(activeBoxes));
      }
      getPastDeliveries().then((responsePastDeliveries) => {
        if (responsePastDeliveries.length > 0) {
          const pastDeliveries: IDelivery[] = [];
          responsePastDeliveries.forEach((deliveryBoxObject) =>
            pastDeliveries.push({ ...deliveryBoxObject.delivery })
          );
          dispatch(setPastDeliveries(pastDeliveries));
          const pastBoxes: IBox[] = [];
          responsePastDeliveries.forEach((deliveryBoxObject) =>
            pastBoxes.push({ ...deliveryBoxObject.pickupBox })
          );
          dispatch(setPastDeliveriesBoxes(pastBoxes));
        }
        setInitialize(true);
      });
    });
  }

  return (
    <div>
      <Navbar />
      {initialize ? <HomeScreen user={user} /> : <LoadingScreen />}
    </div>
  );
};
