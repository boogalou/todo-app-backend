import { IUserModel } from '../user/user.model.interface';
import { Document } from 'mongoose';

export interface ITokenModel extends Document {
  _id: string
  user: IUserModel | string;
  refreshToken: string;
}