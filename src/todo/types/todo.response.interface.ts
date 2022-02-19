import { IUserModel } from "../../user/types/user.model.interface";

export interface TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  owner: IUserModel;
  createdAt: Date;
}