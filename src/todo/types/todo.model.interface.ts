import { Document } from 'mongoose'
import { IUserModel } from '../../user/types/user.model.interface';

export interface ITodoModel extends Document{
  title: string;
  completed: boolean;
  user: IUserModel;
  createdAt: Date
}
