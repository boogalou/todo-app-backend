import { Document } from 'mongoose';
import { ITodoModel } from '../todo/types/todo.model.interface';

export interface IUserModel extends Document {
  email: string;
  name: string;
  password: string;
  todos: ITodoModel;
  isActivated: boolean;
  activationLink: string;
}