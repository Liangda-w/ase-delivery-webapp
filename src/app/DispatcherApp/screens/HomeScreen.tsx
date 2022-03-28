import React from "react";

// DEPENDENCIES
import AddIcon from "@mui/icons-material/Add";

// UI-COMPONENTS
import {
  Button,
  Page,
  Container,
  Typography,
  useModalNewDelivery,
} from "../../../components";

// DISPATCHER COMPONENTS
import OpenDeliveryTable from "../components/OpenDeliveryTable";
import ActiveDeliveryTable from "../components/ActiveDeliveryTable";
import FinishedDeliveryTable from "../components/FinishedDeliveryTable";

// // INTERFACES
import { IUser } from "../../../interfaces";

export const HomeScreen = ({ user }: { user: IUser }): JSX.Element => {
  const modalNewDelivery = useModalNewDelivery({
    confirm: () => undefined,
    close: () => undefined,
  });

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
        {modalNewDelivery.markup}

        <Button classes="mb-3 mt-5" onClick={() => modalNewDelivery.open(true)}>
          <AddIcon /> New Delivery
        </Button>
        <Typography classes="mb-3" variant="div">
          In order to edit the deliveries, navigate to Delivery Management.
        </Typography>
        <OpenDeliveryTable />
        <ActiveDeliveryTable />
        <FinishedDeliveryTable />
      </Container>
    </Page>
  );
};
