import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppSelector, useAppDispatch } from "../../state/hooks/userHook";
import {
  getAllDeliveries,
  getCustomers,
  getDeliverers,
  updateDelivery as updateReduxDelivery,
  deleteDelivery as deleteReduxDelivery,
} from "../state";

// COMPONENTS
import {
  Typography,
  Page,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Row,
  Col,
  useModalNewDelivery,
  Button,
} from "../../../components";
import { IBox, IUser, IDelivery } from "../../../interfaces";

import { updateDelivery, deleteDelivery } from "../../../api";

export const DeliveryManagementScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const boxes = useAppSelector((state) => state.boxes.boxes);
  const deliverers = useAppSelector(getDeliverers);
  const customers = useAppSelector(getCustomers);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [delivery, setDelivery] = useState<
    | { box?: IBox; customer?: IUser; deliverer?: IUser; delivery: IDelivery }
    | undefined
  >();

  const handleClose = () => {
    setIsOpen(false);
  };

  const boxLookup = boxes.reduce(
    (object, box) => ({ ...object, [box.boxId]: box.name }),
    {}
  );

  const delivererLookup = deliverers.reduce(
    (object, deliverer) => ({ ...object, [deliverer.id]: deliverer.username }),
    {}
  );

  const statusLookUp = {
    ORDERED: "ORDERED",
    PICKEDUP: "PICKEDUP",
    COMPLETED: "COMPLETED",
    DELIVERED: "DELIVERED",
  };

  const customerLookup = customers.reduce(
    (object, customer) => ({ ...object, [customer.id]: customer.username }),
    {}
  );

  const generateDeliveryData = (rowData: IDelivery) => {
    const box = boxes.find(
      (boxElement) => boxElement.boxId === rowData.targetBoxId
    );
    const deliverer = deliverers.find(
      (delivererElement) => delivererElement.id === rowData.delivererId
    );
    const customer = customers.find(
      (customerElement) => customerElement.id === rowData.customerId
    );
    setDelivery({ delivery: rowData, box, deliverer, customer });
  };

  const modalNewDelivery = useModalNewDelivery({
    confirm: () => undefined,
    close: () => undefined,
  });
  return (
    <Page>
      <Container>
        <Typography display="inline" variant="h1">
          Delivery Management
        </Typography>
        <br />
        <br />
        {modalNewDelivery.markup}

        <Button classes="mb-3 mt-5" onClick={() => modalNewDelivery.open(true)}>
          <AddIcon /> New Delivery
        </Button>
        <Row>
          <Modal open={isOpen} onClose={handleClose}>
            <ModalHeader closeButton>
              <ModalTitle>
                Information to delivery #{delivery?.delivery.deliveryId}
              </ModalTitle>
            </ModalHeader>

            <ModalBody>
              <Container>
                <Row>
                  <Col classes="mb-2">
                    <Typography color="primary" variant="h5">
                      Customer:
                    </Typography>
                    <Typography variant="div">
                      <strong>Username: </strong>
                      {delivery?.customer
                        ? delivery.customer.username
                        : "No data available."}
                    </Typography>

                    <Typography variant="div">
                      <strong>E-Mail: </strong>
                      {delivery?.customer
                        ? delivery.customer.email
                        : "No data available."}
                    </Typography>
                  </Col>
                </Row>
                <Row>
                  <Col classes="mb-2">
                    <Typography color="primary" variant="h5">
                      Deliverer:
                    </Typography>
                    <Typography variant="div">
                      <strong>Username:</strong>{" "}
                      {delivery?.deliverer
                        ? delivery.deliverer.username
                        : "No data available."}
                    </Typography>
                    <Typography variant="div">
                      <strong>E-Mail: </strong>
                      {delivery?.deliverer
                        ? delivery.deliverer.email
                        : "No data available."}
                    </Typography>
                  </Col>
                </Row>
                <Row>
                  <Col classes="mb-2">
                    <Typography color="primary" variant="h5">
                      Target Box:
                    </Typography>
                    <Typography variant="div">
                      <strong>Name: </strong>
                      {delivery?.box ? delivery.box.name : "No data available."}
                    </Typography>
                    <Typography variant="div">
                      <strong>Adress: </strong>
                      {delivery?.box
                        ? `${delivery?.box?.street}, ${delivery?.box?.zip} ${delivery?.box?.city}`
                        : ""}
                    </Typography>
                    <br />
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter
              modalActions={[
                { children: "Close", color: "primary", onClick: handleClose },
              ]}
            />
          </Modal>
          <Col classes="mb-3">
            <MaterialTable
              title="Deliveries"
              columns={[
                { title: "id", field: "deliveryId", editable: "never" },
                {
                  title: "Customer",
                  field: "customerId",
                  lookup: customerLookup,
                },
                { title: "Status", field: "status", lookup: statusLookUp },
                {
                  title: "Destination Box",
                  field: "targetBoxId",
                  lookup: boxLookup,
                },
                {
                  title: "Deliverer",
                  field: "delivererId",
                  lookup: delivererLookup,
                },
              ]}
              editable={{
                onRowUpdate: (newData) =>
                  updateDelivery(newData).then((responseStatus) => {
                    if (responseStatus === 200)
                      dispatch(updateReduxDelivery(newData));
                  }),
                onRowDelete: (oldData) =>
                  deleteDelivery(oldData as IDelivery).then((response) => {
                    if (response === 200)
                      dispatch(deleteReduxDelivery(oldData));
                  }),
              }}
              data={useAppSelector(getAllDeliveries)}
              icons={tableIcons}
              onRowClick={(event, rowData) => {
                if (rowData) {
                  generateDeliveryData(rowData);
                  setIsOpen(true);
                }
              }}
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
