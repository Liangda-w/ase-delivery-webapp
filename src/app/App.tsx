import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./state/hooks/userHook";
import { setLoading, setUser } from "./state/slices/userSlice";

// SCREEMS
import { LoadingScreen, StartScreen, NotFoundScreen } from "../screens";

// API
import { getCsrfToken, verifyAccess } from "../api";

import { ProtectedRoute } from "./ProtectedRoute";

import { IUser } from "../interfaces";

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading) {
    getCsrfToken().then((response) => {
      if (response === 200) {
        verifyAccess(false).then((responseAccess) => {
          if (responseAccess !== 403) {
            const currentUser = responseAccess as IUser;
            dispatch(
              setUser({
                username: currentUser.username,
                email: currentUser.email,
                id: currentUser.id,
                password: currentUser.password,
                roles: currentUser.roles,
              })
            );
          }
          dispatch(setLoading(false));
        });
      }
    });
    if (!user) {
      return <Redirect to="/" />;
    }
  }

  return (
    <Switch>
      <Route path="/dashboard">
        {user ? (
          <ProtectedRoute role={user.roles[0].name} />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route
        exact
        path="/"
        component={isLoading ? LoadingScreen : StartScreen}
      />
      <Route path="*" component={NotFoundScreen} />
    </Switch>
  );
};
