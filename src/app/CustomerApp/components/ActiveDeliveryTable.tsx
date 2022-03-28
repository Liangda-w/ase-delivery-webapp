import React from "react";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppSelector } from "../../state/hooks/userHook";
import { getActiveDeliveriesTableData } from "../state";

// UI-COMPONENTS
import { Col, Row } from "../../../components";

const ActiveDeliveryTable = (): JSX.Element => {
  return (
    <Row>
      <Col classes="mb-3">
        <MaterialTable
          title="Active Deliveries"
          columns={[
            { title: "Tracking Code", field: "deliveryId", editable: "never" },
            { title: "Status", field: "status" },
            { title: "Box Address", field: "address" },
          ]}
          localization={{
            toolbar: {
              searchPlaceholder: "Enter your tracking code.",
            },
          }}
          data={useAppSelector(getActiveDeliveriesTableData)}
          // data={data}
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
