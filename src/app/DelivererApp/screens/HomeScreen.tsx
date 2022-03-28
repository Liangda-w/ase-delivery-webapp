import React from "react";

// UI-COMPONENTS
import { Page, Container, Typography } from "../../../components";

// TABLE COMPONENTS
import AssignedDeliveriesTable from "../components/AssignedDeliveriesTable";

// INTERFACES
import { IUser } from "../../../interfaces";
import AssignedBoxesTable from "../components/AssignedBoxesTable";

export const HomeScreen = ({ user }: { user: IUser }): JSX.Element => {
  return (
    <Page>
      <Container>
        <Typography display="inline" variant="h1">
          Welcome Back{" "}
          <Typography
            display="inline"
            color="primary"
            variant="h1"
            component="div"
          >
            <em>{user.username}</em>
          </Typography>{" "}
          !
        </Typography>
        <br />
        <Typography classes="mb-3" variant="div">
          Your assigned deliveries dashboard
        </Typography>
        <Typography classes="mb-3" variant="div">
          You can change the status of a delivery from ORDERED to PICKED UP by
          clicking on the corresponding row.
        </Typography>
        <AssignedDeliveriesTable />
        <AssignedBoxesTable />
      </Container>
    </Page>
  );
};
