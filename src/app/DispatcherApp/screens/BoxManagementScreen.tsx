import React from "react";
import AddIcon from "@mui/icons-material/Add";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppDispatch, useAppSelector } from "../../state/hooks/userHook";
import { getBoxes, updateBox, deleteBox } from "../state";

// COMPONENTS
import {
  Typography,
  Page,
  Container,
  Row,
  Col,
  Button,
} from "../../../components";
import { useModalNewBox } from "../components/ModalNewBox";

// API
import { updatePickUpBox, deletePickUpBox } from "../../../api";

export const BoxManagementScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const modalNewBox = useModalNewBox({
    confirm: () => undefined,
    close: () => undefined,
  });

  return (
    <Page>
      <Container>
        <Typography display="inline" variant="h1">
          Box Management
        </Typography>
        <br />
        <br />
        <Button classes="mb-3 mt-5" onClick={() => modalNewBox.open(true)}>
          <AddIcon /> New Box
        </Button>
        {modalNewBox.markup}
        <Row>
          <Col classes="mb-3">
            <MaterialTable
              title="Unused Boxes"
              columns={[
                { title: "id", field: "boxId", editable: "never" },
                { title: "Name", field: "name" },
                {
                  title: "Box Status",
                  field: "pickupBoxStatus",
                  editable: "never",
                },
                { title: "Street", field: "street", editable: "never" },
                { title: "Zip", field: "zip", editable: "never" },
                { title: "City", field: "city", editable: "never" },
                { title: "In Use", field: "inUse", editable: "never" },
              ]}
              data={useAppSelector(getBoxes).filter((box) => !box.inUse)}
              editable={{
                onRowUpdate: (newData) =>
                  updatePickUpBox(newData).then((responseStatus) => {
                    if (responseStatus === 200) dispatch(updateBox(newData));
                  }),
                onRowDelete: (oldData) =>
                  deletePickUpBox(oldData).then((response) => {
                    if (response === 200) dispatch(deleteBox(oldData));
                  }),
              }}
              icons={tableIcons}
              options={{
                paging: true,
                emptyRowsWhenPaging: true,
                pageSizeOptions: [5, 10, 15],
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col classes="mb-3">
            <MaterialTable
              title="Assigned boxes"
              columns={[
                { title: "id", field: "boxId", editable: "never" },
                { title: "Name", field: "name" },
                {
                  title: "Box Status",
                  field: "pickupBoxStatus",
                  editable: "never",
                },
                { title: "Street", field: "street", editable: "never" },
                { title: "Zip", field: "zip", editable: "never" },
                { title: "City", field: "city", editable: "never" },
                { title: "In Use", field: "inUse", editable: "never" },
              ]}
              data={useAppSelector(getBoxes).filter((box) => box.inUse)}
              editable={{
                onRowUpdate: (newData) =>
                  updatePickUpBox(newData).then((responseStatus) => {
                    if (responseStatus === 200) dispatch(updateBox(newData));
                  }),
                onRowDelete: (oldData) =>
                  deletePickUpBox(oldData).then((response) => {
                    if (response === 200) dispatch(deleteBox(oldData));
                  }),
              }}
              icons={tableIcons}
              options={{
                paging: true,
                emptyRowsWhenPaging: true,
                pageSizeOptions: [5, 10, 15],
              }}
            />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
