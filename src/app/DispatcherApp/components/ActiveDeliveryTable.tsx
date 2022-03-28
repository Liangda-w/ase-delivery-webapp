import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppSelector } from "../../state/hooks/userHook";
import { getActiveDeliveries, getCustomers, getDeliverers } from "../state";

// // UI-COMPONENTS
import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Container,
  Row,
  Typography,
} from "../../../components";
import { IBox, IUser, IDelivery } from "../../../interfaces";

const ActiveDeliveryTable = (): JSX.Element => {
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

  return (
    <Row>
      <Col classes="mb-3">
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
        <MaterialTable
          title="Active Deliveries"
          columns={[
            { title: "id", field: "deliveryId", editable: "never" },
            { title: "Customer", field: "customerId" },
            { title: "Status", field: "status" },
            { title: "TargetBox", field: "targetBoxId" },
            { title: "Deliverer", field: "delivererId" },
          ]}
          onRowClick={(event, rowData) => {
            if (rowData) {
              generateDeliveryData(rowData);
              setIsOpen(true);
            }
          }}
          data={useAppSelector(getActiveDeliveries)}
          icons={tableIcons}
          options={{
            paging: true,
            emptyRowsWhenPaging: true,
            pageSizeOptions: [5, 10, 15],
          }}
        />
      </Col>
    </Row>
  );
};

export default ActiveDeliveryTable;
