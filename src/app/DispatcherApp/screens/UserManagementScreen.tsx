import React from "react";
import AddIcon from "@mui/icons-material/Add";

import { useAppSelector } from "../../state/hooks/userHook";
import { getDeliverers, getDispatchers } from "../state/slices/usersSlice";

// COMPONENTS
import { Typography, Page, Container, Button } from "../../../components";
import { useModalNewUser } from "../components/ModalNewUser";
import { CustomerTable } from "../components/CustomerTable";
import { DelivererTable } from "../components/DelivererTable";
import { DispatcherTable } from "../components/DispatcherTable";

// INTERFACES
import { IDisplayUser, IUser } from "../../../interfaces";

export const UserManagementScreen = (): JSX.Element => {
  const deliverers: IDisplayUser[] = [];
  const dispatchers: IDisplayUser[] = [];

  useAppSelector(getDeliverers).forEach((deliverer: IUser) =>
    deliverers.push({
      id: deliverer.id,
      username: deliverer.username,
      email: deliverer.email,
    })
  );

  useAppSelector(getDispatchers).forEach((dispatcher: IUser) =>
    dispatchers.push({
      id: dispatcher.id,
      username: dispatcher.username,
      email: dispatcher.email,
    })
  );
  const modalNewUser = useModalNewUser({
    confirm: () => undefined,
    close: () => undefined,
  });

  return (
    <Page>
      <Container>
        <Typography display="inline" variant="h1">
          User Management
        </Typography>
        <br />
        <br />
        <Button classes="mb-3 mt-5" onClick={() => modalNewUser.open(true)}>
          <AddIcon /> New User
        </Button>
        {modalNewUser.markup}
        <CustomerTable />
        <DelivererTable />
        <DispatcherTable />
      </Container>
    </Page>
  );
};
