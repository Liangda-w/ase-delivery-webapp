import React from "react";
import MaterialTable from "@material-table/core";
import { tableIcons } from "../../../assets/constants";

import { useAppSelector, useAppDispatch } from "../../state/hooks/userHook";
import {
  getDeliverers,
  deleteUser as deleteReduxUser,
  setUsers,
} from "../state";

import { Row, Col } from "../../../components";

import {
  deleteUser,
  updateUserInfo,
  upateUserPassword,
  udpateUserRole,
  getUsers,
} from "../../../api";

import { baseInfoNotification } from "../../../assets/notifications/notifications";

export const DelivererTable = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <Row>
      <Col classes="mb-3">
        <MaterialTable
          title="Deliverers"
          columns={[
            { title: "#ID", field: "id", editable: "never" },
            {
              title: "Username",
              field: "username",
              validate: (rowData) => ({
                isValid: /^[a-zA-Z0-9]*$/.test(rowData.username),
              }),
            },
            {
              title: "E-Mail",
              field: "email",
              validate: (rowData) => ({
                isValid: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  rowData.email
                ),
              }),
            },
            { title: "Password", field: "password", render: () => <p>****</p> },
            {
              title: "Role",
              field: "role",
              lookup: {
                ROLE_DISPATCHER: "ROLE_DISPATCHER",
                ROLE_CUSTOMER: "ROLE_CUSTOMER",
                ROLE_DELIVERER: "ROLE_DELIVERER",
              },
            },
          ]}
          data={useAppSelector(getDeliverers)}
          editable={{
            onRowUpdate: (newData, oldData) =>
              updateUserInfo(
                oldData.username,
                newData.username,
                newData.email
              ).then((response) => {
                if (response === 200) {
                  udpateUserRole(
                    newData.username,
                    oldData.role,
                    newData.role
                  ).then((responseUpdateRole) => {
                    if (responseUpdateRole === 200) {
                      if (newData.password) {
                        upateUserPassword(
                          newData.username,
                          newData.password
                        ).then((responseStatus) => {
                          if (responseStatus === 200) {
                            getUsers().then((getUsersResponse) => {
                              if (getUsersResponse.length >= 0) {
                                dispatch(setUsers(getUsersResponse));
                              }
                            });
                          }
                        });
                      } else {
                        getUsers().then((getUsersResponse) => {
                          if (getUsersResponse.length >= 0) {
                            dispatch(setUsers(getUsersResponse));
                          }
                        });
                      }
                    }
                  });
                }
              }),

            onRowDelete: (oldData) =>
              deleteUser(oldData.username).then((response) => {
                if (response === 200) {
                  baseInfoNotification(
                    "Possible data gaps!",
                    "You may need to update the deliveries associated with the deleted deliverer."
                  );
                  dispatch(deleteReduxUser(oldData));
                }
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
  );
};
