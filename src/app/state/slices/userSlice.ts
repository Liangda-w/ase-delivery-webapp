import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces";
import { RootState } from "../store";

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
}

const initialState: IUserState = {
  user: undefined,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: IUserState, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setLoading(state: IUserState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    logout(state: IUserState) {
      state.user = initialState.user;
      state.isLoading = initialState.isLoading;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;

export const getCurrentUser = createSelector(
  (state: RootState) => state.auth.user,
  (user) => {
    return user;
  }
);

export const getUserRole = createSelector(
  (state: RootState) => state.auth.user,
  (user) => {
    return user?.roles[0].name;
  }
);
