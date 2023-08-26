import { Model } from "mongoose";

export interface User {
  _id: string,
  email: string;
  username: string;
  password: string;
  is_admin: boolean;
}

export interface UserModel extends Model<User> {
  login: (email: string, password: string) => Promise<string | Error>;
  create_account: (email: string, password: string) => Promise<any>;
  get_data: (token: string, prop: string) => Promise<Success & User>
}

export enum ErrorCodes {
  "Bad Request" = 400,
  "Unauthorized",
  "PaymentRequired",
  "Forbidden",
  "Not found",
}

export enum SuccessCodes {
  "OK" = 200,
  "CREATED",
  "Accepted",
  "Partial",
  "Information",
  "No Response",
}

export interface Err {
  message: string;
  statusCode: ErrorCodes;
  status: string;
}

export interface Success {
  message: string;
  statusCode: SuccessCodes;
  status: string;
}
