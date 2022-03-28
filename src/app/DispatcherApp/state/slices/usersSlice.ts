import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { IUser, EUserRole } from "../../../../interfaces";
import { RootState } from "../../../state/store";

export interface IAseUsers {
  aseUsers: IUser[];
}

const initialState: IAseUsers = {
  aseUsers: [],
};

const usersSlice = createSlice({
  name: "aseUsers",
  initialState,
  reducers: {
    setUsers(state: IAseUsers, action: PayloadAction<IUser[]>) {
      state.aseUsers = action.payload;
    },
    addUser(state: IAseUsers, action: PayloadAction<IUser>) {
      if (state.aseUsers.length > 0) {
        state.aseUsers = [...state.aseUsers, action.payload];
      } else {
        state.aseUsers = [action.payload];
      }
    },
    deleteUser(state: IAseUsers, action: PayloadAction<IUser>) {
      state.aseUsers = state.aseUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
    updateUser(state: IAseUsers, action: PayloadAction<IUser>) {
      const userIndex = state.aseUsers.findIndex(
        (user) => user.id === action.payload.id
      );
      state.aseUsers[userIndex] = action.payload;
    },
  },
});

export const { setUsers, addUser, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;

export const getCustomers = createSelector(
  (state: RootState) => state.users.aseUsers,
  (aseUsers) => {
    return aseUsers.flatMap((user: IUser) =>
      user.roles.findIndex(
        (roleItem) => roleItem.name === EUserRole.CUSTOMER
      ) >= 0
        ? { ...user, role: EUserRole.CUSTOMER }
        : []
    );
  }
);

export const getDeliverers = createSelector(
  (state: RootState) => state.users.aseUsers,
  (aseUsers) => {
    return aseUsers.flatMap((user: IUser) =>
      user.roles.findIndex(
        (roleItem) => roleItem.name === EUserRole.DELIVERER
      ) >= 0
        ? { ...user, role: EUserRole.DELIVERER }
        : []
    );
  }
);

export const getDispatchers = createSelector(
  (state: RootState) => state.users.aseUsers,
  (aseUsers) => {
    return aseUsers.flatMap((user: IUser) =>
      user.roles.findIndex(
        (roleItem) => roleItem.name === EUserRole.DISPATCHER
      ) >= 0
        ? { ...user, role: EUserRole.DISPATCHER }
        : []
    );
  }
);
