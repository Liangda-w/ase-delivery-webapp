import React, { useState } from "react";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppDispatch, useAppSelector } from "../../state/hooks/userHook";
import { getAssignedDeliveries, updateDelivery } from "../state";

// UI-COMPONENTS
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Typography,
} from "../../../components";
import { EDeliveryStatus } from "../../../interfaces";
import { pickupDelivery } from "../../../api";

const AssignedDeliveriesTable = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deliveryId, setDeliveryId] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleChange = () => {
    pickupDelivery(deliveryId).then((responseDeliveries) => {
      if (responseDeliveries.length > 0) {
        responseDeliveries.forEach((delivery) =>
          dispatch(updateDelivery(delivery))
        );
      }
    });
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Row>
      <Col classes="mb-3">
        <Modal open={isOpen} onClose={handleClose}>
          <ModalBody>
            <Container>
              <Row>
                <Col classes="mb-2">
                  <Typography color="primary" variant="h5">
                    Do you want to change the statues from ORDERED to PICKED UP?
                  </Typography>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter
            modalActions={[
              { children: "Yes", color: "primary", onClick: handleChange },
              { children: "Cancel", color: "primary", onClick: handleClose },
            ]}
          />
        </Modal>
        <MaterialTable
          title="Assigned Deliveries"
          columns={[
            {
              title: "Delivery ID",
              field: "delivery.deliveryId",
              editable: "never",
            },
            { title: "Delivery Status", field: "delivery.status" },
            { title: "Box ID", field: "pickupBox.boxId", editable: "never" },
            { title: "Box Name", field: "pickupBox.name" },
            { title: "Street", field: "pickupBox.street" },
            { title: "Zip", field: "pickupBox.zip" },
            { title: "City", field: "pickupBox.city" },
          ]}
          data={useAppSelector(getAssignedDeliveries)}
          onRowClick={(event, rowData) => {
            if (rowData.delivery.status === EDeliveryStatus.ORDERED) {
              setDeliveryId([rowData.delivery.deliveryId]);
              setIsOpen(true);
            }
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
  );
};

export default AssignedDeliveriesTable;
