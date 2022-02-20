import { IUserModel } from "../../user/types/user.model.interface";

export interface ResponseTodo {
  _id: string;
  title: string;
  completed: boolean;
  user: IUserModel;
  createdAt: Date;
}