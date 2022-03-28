// 3RD LIBRARY
import React from "react";
import { Switch, Route } from "react-router-dom";

// REDUX STORE
import { useAppDispatch } from "../state/hooks/userHook";
import { setBoxes } from "./state/slices/boxSlice";
import { setUsers } from "./state/slices/usersSlice";
import { setDeliveries } from "./state/slices/deliveriesSlice";

// COMPONENTS
import { Navbar, Link } from "../../components";

// INTERACES
import { IUser } from "../../interfaces";

// API
import {
  getAllDeliveries,
  getPickUpBoxes,
  getUsers,
  verifyAccess,
} from "../../api";

// SCREENS
import { LoadingScreen } from "../../screens";
import {
  HomeScreen,
  UserManagementScreen,
  BoxManagementScreen,
  DeliveryManagementScreen,
} from "./screens";

interface IDispatcherApp {
  user: IUser;
}

export const DispatcherApp = ({ user }: IDispatcherApp): JSX.Element => {
  const dispatch = useAppDispatch();

  const [initialize, setInitialize] = React.useState(false);

  if (!initialize) {
    verifyAccess().then((responseAccess) => {
      if (typeof responseAccess !== "number") {
        getAllDeliveries().then((responseDeliveries) => {
          if (responseDeliveries.length > 0 && user.roles.length > 0) {
            dispatch(setDeliveries(responseDeliveries));
          }
          getPickUpBoxes().then((responseBoxes) => {
            if (responseBoxes.length > 0) {
              dispatch(setBoxes(responseBoxes));
            }
            getUsers().then((responseUsers) => {
              if (responseUsers.length > 0) {
                dispatch(setUsers(responseUsers));
                setInitialize(true);
              }
            });
          });
        });
      }
    });
  }

  return (
    <>
      <Navbar>
        <li className="nav-item">
          <Link
            to="/dashboard/deliveries"
            classes="nav-link"
            route
            type="navItem"
          >
            Delivery Management
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/boxes" classes="nav-link" route type="navItem">
            Box Management
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/users" classes="nav-link" route type="navItem">
            User Management
          </Link>
        </li>
      </Navbar>
      <Switch>
        <Route path="/dashboard/boxes">
          <BoxManagementScreen />
        </Route>
        <Route path="/dashboard/users">
          <UserManagementScreen />
        </Route>
        <Route path="/dashboard/deliveries">
          <DeliveryManagementScreen />
        </Route>
        <Route path="/dashboard">
          {initialize ? <HomeScreen user={user} /> : <LoadingScreen />}
        </Route>
      </Switch>
    </>
  );
};
