import React from "react";
import { IUser } from "../../interfaces";
import { Navbar } from "../../components";
import { HomeScreen } from "./screens";
import { LoadingScreen } from "../../screens";
import { getAssignedDeliveries, getAssignedBoxes } from "../../api";
import { setAssignedDeliveries, setAssignedBoxes } from "./state";
import { useAppDispatch } from "../state/hooks/userHook";

interface IDelivererApp {
  user: IUser;
}

export const DelivererApp = ({ user }: IDelivererApp): JSX.Element => {
  const dispatch = useAppDispatch();
  const [initialize, setInitialize] = React.useState(false);

  if (!initialize) {
    getAssignedDeliveries().then((responseAssignedDeliveries) => {
      if (responseAssignedDeliveries.length > 0 && user.roles.length > 0) {
        dispatch(setAssignedDeliveries(responseAssignedDeliveries));
      }
      getAssignedBoxes().then((responseAssignedBoxes) => {
        if (responseAssignedBoxes.length > 0 && user.roles.length > 0) {
          dispatch(setAssignedBoxes(responseAssignedBoxes));
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
