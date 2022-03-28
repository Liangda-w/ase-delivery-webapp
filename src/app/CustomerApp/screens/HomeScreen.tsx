import React from "react";

// UI-COMPONENTS
import { Page, Container, Typography } from "../../../components";

// TABLE COMPONENTS
import ActiveDeliveryTable from "../components/ActiveDeliveryTable";
import PastDeliveryTable from "../components/PastDeliveryTable";

// INTERFACES
import { IUser } from "../../../interfaces";

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
          Your delivery dashboard
        </Typography>
        <ActiveDeliveryTable />
        <PastDeliveryTable />
      </Container>
    </Page>
  );
};
