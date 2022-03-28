import React from "react";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

// REDUX
import { useAppSelector } from "../../state/hooks/userHook";
import { getAssignedBoxes } from "../state";

// UI-COMPONENTS
import { Col, Row } from "../../../components";

const AssignedDeliveriesTable = (): JSX.Element => {
  return (
    <Row>
      <Col classes="mb-3">
        <MaterialTable
          title="Assigned Boxes"
          columns={[
            { title: "Box ID", field: "boxId", editable: "never" },
            { title: "Box Name", field: "name" },
            { title: "Street", field: "street" },
            { title: "Zip", field: "zip" },
            { title: "City", field: "city" },
          ]}
          data={useAppSelector(getAssignedBoxes)}
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
