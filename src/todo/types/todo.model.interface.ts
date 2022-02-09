import { Document } from 'mongoose'
import { IUserModel } from '../../user/user.model.interface';

export interface ITodoModel extends Document{
  id: string;
  title: string;
  completed: boolean;
  user: IUserModel
}
