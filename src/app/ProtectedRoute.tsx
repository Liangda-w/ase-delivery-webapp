import React from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "./state/hooks/userHook";
import { EUserRole } from "../interfaces";
import { NotFoundScreen, LoadingScreen } from "../screens";

// USER VIEWS
import { DispatcherApp } from "./DispatcherApp";
import { DelivererApp } from "./DelivererApp";
import { CustomerApp } from "./CustomerApp";

export const ProtectedRoute = ({ role }: { role: EUserRole }): JSX.Element => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (user) {
    switch (role) {
      case EUserRole.DISPATCHER:
        return <DispatcherApp user={user} />;
      case EUserRole.CUSTOMER:
        return <CustomerApp user={user} />;
      case EUserRole.DELIVERER:
        return <DelivererApp user={user} />;
      default:
        break;
    }
  }
  return <NotFoundScreen />;
};
