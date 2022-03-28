export enum EUserRole {
  DELIVERER = "ROLE_DELIVERER",
  DISPATCHER = "ROLE_DISPATCHER",
  CUSTOMER = "ROLE_CUSTOMER",
}

export interface IUserRoleObject {
  id: string;
  name: EUserRole;
}
export interface IDisplayUser {
  id: string;
  username: string;
  email: string;
}

export interface IUser extends IDisplayUser {
  password: string;
  roles: IUserRoleObject[];
}
